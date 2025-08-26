import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import TipContent from '../TipContent';
import { meta } from './meta';

const DapperTip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('dapper.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('dapper.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('dapper.content.sections.methods.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="dapper-methods-overview"
        maxHeight={360}
        code={t('dapper.content.sections.methods.codeBlock')}
      />

  <Typography variant="h4" gutterBottom>
        {t('dapper.content.sections.simpleExample.title')}
      </Typography>
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

  <Typography variant="h4" gutterBottom>
        {t('dapper.content.sections.aliasMapping.title')}
      </Typography>
      <CodeBlock
        language="csharp"
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

  <Typography variant="h4" gutterBottom>
        {t('dapper.content.sections.multiMapping.title')}
      </Typography>
      <CodeBlock
        language="csharp"
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
        <Typography
          variant="caption"
          component="div"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          <Link
            href="https://github.com/DapperLib/Dapper"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="inherit"
          >
            {t('dapper.content.footer.sourceLabel')}
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('dapper.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
  </TipContent>
  );
};

const mod: TipModule = { default: DapperTip, meta };
export default DapperTip;
export { mod };
