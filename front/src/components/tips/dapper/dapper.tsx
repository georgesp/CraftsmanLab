import React from 'react';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'dapper',
  title: 'Utilisation de Dapper',
  shortDescription: 'Utilisation de Dapper (DTO, alias, multi‑mapping).',
  writtenOn: '2025-08-12',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: [
        'dapper', 'orm', 'micro-orm', 'base de données', 'sql', 'requête', 'mapping', 
        'dto', 'entity', 'performance', 'query', 'execute', 'paramètres',
        'transaction', 'connection', 'stored procedure', 'procédure stockée',
        'queryFirst', 'querySingle', 'queryMultiple'
      ],
      en: [
        'dapper', 'orm', 'micro-orm', 'database', 'sql', 'query', 'mapping',
        'dto', 'entity', 'performance', 'execute', 'parameters',
        'transaction', 'connection', 'stored procedure',
        'queryFirst', 'querySingle', 'queryMultiple'
      ]
    }
  }
};

const DapperTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        Aperçu des méthodes de requête, paramètres, et exemples de mapping simples et avancés.
      </Typography>

      <Typography variant="h4" gutterBottom>Liste des méthodes de requête Dapper</Typography>
  <CodeBlock language="csharp"
    ariaLabel="dapper-methods-overview"
    maxHeight={360}
    code={`Méthode                 | Signature (simplifiée)
------------------------|------------------------------------------------------------
Query<T>                | IEnumerable<T> Query<T>(sql, param = null, tx = null, buffered = true, timeout = null)
QueryFirst<T>           | T QueryFirst<T>(sql, param = null, tx = null)
QueryFirstOrDefault<T>  | T QueryFirstOrDefault<T>(sql, param = null, tx = null)
QuerySingle<T>          | T QuerySingle<T>(sql, param = null, tx = null)
QuerySingleOrDefault<T> | T QuerySingleOrDefault<T>(sql, param = null, tx = null)
Execute                 | int Execute(sql, param = null, tx = null, timeout = null)
ExecuteScalar<T>        | T ExecuteScalar<T>(sql, param = null, tx = null)
QueryMultiple           | GridReader QueryMultiple(sql, param = null, tx = null)
QueryAsync<T>           | Task<IEnumerable<T>> QueryAsync<T>(sql, param = null, tx = null)

Remarque: param peut être un objet anonyme ou un POCO. Dapper mappe les propriétés vers les @Param SQL.`}
  />

  <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>Exemple simple – Retourner un DTO existant</Typography>
  <CodeBlock
    language="csharp"
    ariaLabel="dapper-simple-dto"
    code={`public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

using (var conn = new SqlConnection(connString))
{
    const string sql = @"
        SELECT Id, Name, Price
        FROM Products
        WHERE Id = @ProductId";

    var product = await conn.QueryFirstOrDefaultAsync<ProductDto>(
                       sql,
                       new { ProductId = 42 });

  if (product == null)
  {
    Console.WriteLine("Product not found.");
  }
  else
  {
    Console.WriteLine($"{product.Name} : {product.Price:C}");
  }
}
// Advantage: automatic mapping via property names.`}
      />

  <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>Mapping sur un objet à structure différente</Typography>
      <CodeBlock language="csharp"
        ariaLabel="dapper-alias-mapping"
        code={`public class OrderSummary
{
    public int OrderId { get; set; }
    public string CustomerName { get; set; }
    public DateTime OrderDate { get; set; }
}

// Requête SQL
SELECT 
    o.Id       AS OrderId,
    c.FullName AS CustomerName,
    o.OrderDate
FROM Orders o
JOIN Customers c ON o.CustomerId = c.Id
WHERE o.Id = @OrderId;

// Code C#
using (var conn = new SqlConnection(connString))
{
    const string sql = @"
        SELECT 
            o.Id       AS OrderId,
            c.FullName AS CustomerName,
            o.OrderDate
        FROM Orders o
        JOIN Customers c ON o.CustomerId = c.Id
        WHERE o.Id = @OrderId";

    var summary = await conn.QueryFirstOrDefaultAsync<OrderSummary>(
                       sql,
                       new { OrderId = 101 });

  // summary.CustomerName is populated via the alias
}
// Tip: use alias (AS) to match columns -> properties.`}
      />

  <Typography variant="h4" sx={{ mt: 4 }} gutterBottom>Multi‑DTO – Mapping parent + lignes</Typography>
      <CodeBlock language="csharp"
        ariaLabel="dapper-multi-mapping"
        code={`public class OrderDto
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public List<OrderLineDto> Lines { get; set; } = new List<OrderLineDto>();
}

public class OrderLineDto
{
    public int LineId { get; set; }
    public string ProductName { get; set; }
    public int Quantity { get; set; }
}

// Requête SQL
SELECT 
    o.Id        AS Id,
    o.OrderDate AS Date,
    ol.LineId   AS LineId,
    p.Name      AS ProductName,
    ol.Quantity AS Quantity
FROM Orders o
JOIN OrderLines ol ON ol.OrderId = o.Id
JOIN Products p  ON p.Id = ol.ProductId
WHERE o.Id = @OrderId;

// Code C#
using (var conn = new SqlConnection(connString))
{
    const string sql = @"
        SELECT 
            o.Id        AS Id,
            o.OrderDate AS Date,
            ol.LineId   AS LineId,
            p.Name      AS ProductName,
            ol.Quantity AS Quantity
        FROM Orders o
        JOIN OrderLines ol ON ol.OrderId = o.Id
        JOIN Products p  ON p.Id = ol.ProductId
        WHERE o.Id = @OrderId";

    var lookup = new Dictionary<int, OrderDto>();

    var order = (await conn.QueryAsync<OrderDto, OrderLineDto, OrderDto>(
                       sql,
                       (orderObj, line) =>
                       {
                           if (!lookup.TryGetValue(orderObj.Id, out var root))
                           {
                               root = orderObj;
                               lookup[root.Id] = root;
                           }
                           if (line != null && !root.Lines.Any(l => l.LineId == line.LineId))
                               root.Lines.Add(line);
                           return root;
                       },
                       new { OrderId = 101 },
                       splitOn: "LineId")).FirstOrDefault();

  // order is the single OrderDto with all its lines
}

// Keys:
// - splitOn: "LineId" indicates where Dapper should split into OrderLineDto.
// - The delegate is called per row; group via lookup to consolidate.`}
      />

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <Link href="https://github.com/DapperLib/Dapper" target="_blank" rel="noopener noreferrer" underline="hover" color="inherit">
            Source : Documentation de Dapper
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: DapperTip, meta };
export default DapperTip;
export { mod };
