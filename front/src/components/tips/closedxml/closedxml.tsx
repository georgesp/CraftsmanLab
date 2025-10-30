import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const ClosedXML: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('closedxml.content.mainTitle')}
      </Typography>
      <Typography paragraph>
        {t('closedxml.content.intro')}
      </Typography>

      <Typography variant="h4">
        {t('closedxml.content.installation.title')}
      </Typography>
      <Typography paragraph>
        {t('closedxml.content.installation.description')}
      </Typography>
      <CodeBlock
        language="bash"
        code={`dotnet add package ClosedXML`}
      />

      <Typography variant="h4">
        {t('closedxml.content.createTable.title')}
      </Typography>
      <Typography paragraph>
        {t('closedxml.content.createTable.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`// Define Product model
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

// Create sample data
var products = new List<Product>
{
    new Product { Name = "Laptop", Price = 1200.00m, Quantity = 5 },
    new Product { Name = "Mouse", Price = 25.50m, Quantity = 50 },
    new Product { Name = "Keyboard", Price = 75.00m, Quantity = 30 }
};`}
      />
      <CodeBlock
        language="csharp"
        code={`using ClosedXML.Excel;

using (var workbook = new XLWorkbook())
{
    var worksheet = workbook.Worksheets.Add("Products");
    
    // Add headers
    worksheet.Cell("A1").Value = "Name";
    worksheet.Cell("B1").Value = "Price";
    worksheet.Cell("C1").Value = "Quantity";
    
    // Add product data
    int row = 2;
    foreach (var product in products)
    {
        worksheet.Cell($"A{row}").Value = product.Name;
        worksheet.Cell($"B{row}").Value = product.Price;
        worksheet.Cell($"C{row}").Value = product.Quantity;
        row++;
    }
    
    // Auto-fit columns
    worksheet.Columns("A", "C").AdjustToContents();
    
    workbook.SaveAs("Products.xlsx");
}`}
      />

      <Typography variant="h4">
        {t('closedxml.content.addStyle.title')}
      </Typography>
      <Typography paragraph>
        {t('closedxml.content.addStyle.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using ClosedXML.Excel;

using (var workbook = new XLWorkbook())
{
    var worksheet = workbook.Worksheets.Add("Products");
    
    // Add headers with styling
    var headerRow = worksheet.Row(1);
    headerRow.Cell("A1").Value = "Name";
    headerRow.Cell("B1").Value = "Price";
    headerRow.Cell("C1").Value = "Quantity";
    
    // Apply header style
    headerRow.Cells("A1:C1").Style.Font.Bold = true;
    headerRow.Cells("A1:C1").Style.Fill.BackgroundColor = XLColor.LightBlue;
    
    // Add product data
    int row = 2;
    foreach (var product in products)
    {
        worksheet.Cell($"A{row}").Value = product.Name;
        worksheet.Cell($"B{row}").Value = product.Price;
        worksheet.Cell($"C{row}").Value = product.Quantity;
        row++;
    }
    
    worksheet.Columns("A", "C").AdjustToContents();
    workbook.SaveAs("Products.xlsx");
}`}
      />

      <Typography variant="h4">
        {t('closedxml.content.fromTemplate.title')}
      </Typography>
      <Typography paragraph>
        {t('closedxml.content.fromTemplate.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using ClosedXML.Excel;

using (var workbook = new XLWorkbook("Template.xlsx"))
{
    var worksheet = workbook.Worksheet(1);
    
    // Assuming template has headers: Name, Price, Quantity
    // Fill data starting from row 2
    int row = 2;
    foreach (var product in products)
    {
        worksheet.Cell($"A{row}").Value = product.Name;
        worksheet.Cell($"B{row}").Value = product.Price;
        worksheet.Cell($"C{row}").Value = product.Quantity;
        row++;
    }
    
    // Save with new filename or overwrite
    workbook.SaveAs("Products.xlsx");
}`}
      />

      <Typography variant="h4">
        {t('closedxml.content.advantages.title')}
      </Typography>
      <Typography component="div">
        <ul>
          <li>{t('closedxml.content.advantages.noExcel')}</li>
          <li>{t('closedxml.content.advantages.intuitive')}</li>
          <li>{t('closedxml.content.advantages.performance')}</li>
          <li>{t('closedxml.content.advantages.crossPlatform')}</li>
          <li>{t('closedxml.content.advantages.openSource')}</li>
        </ul>
      </Typography>


      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ fontStyle: 'italic', color: 'text.secondary' }}
        >
          <a
            href="https://github.com/ClosedXML/ClosedXML"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('closedxml.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography
          variant="caption"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          {t('closedxml.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: ClosedXML, meta };
export default ClosedXML;
export { mod };
