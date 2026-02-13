import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const DotNet10AsyncZip: React.FC = () => {
  const { t } = useTranslation('tips');

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('dotnet-10-async-zip.content.mainTitle')}
      </Typography>

      <Typography paragraph>
        {t('dotnet-10-async-zip.content.intro')}
      </Typography>

      <Typography variant="h4">
        {t('dotnet-10-async-zip.content.sections.improvements.title')}
      </Typography>
      <ul>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.improvements.list.async')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.improvements.list.performance')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.improvements.list.gzip')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.improvements.list.memory')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.improvements.list.noBreaking')}
          </Typography>
        </li>
      </ul>

      <Typography variant="h4">
        {t('dotnet-10-async-zip.content.sections.newApis.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-10-async-zip.content.sections.newApis.description')}
      </Typography>
      <ul>
        <li>
          <Typography>
            <code>ZipArchive.CreateAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFile.CreateFromDirectoryAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFile.ExtractToDirectoryAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFile.OpenAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFile.OpenReadAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipArchiveEntry.OpenAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFileExtensions.CreateEntryFromFileAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFileExtensions.ExtractToDirectoryAsync()</code>
          </Typography>
        </li>
        <li>
          <Typography>
            <code>ZipFileExtensions.ExtractToFileAsync()</code>
          </Typography>
        </li>
      </ul>

      <Typography variant="h4">
        {t('dotnet-10-async-zip.content.sections.examples.title')}
      </Typography>

      <Typography variant="h5">
        {t('dotnet-10-async-zip.content.sections.examples.extract.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-10-async-zip.content.sections.examples.extract.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using System;
using System.IO;
using System.IO.Compression;
using System.Threading;
using System.Threading.Tasks;

public static class ZipExtractor
{
    public static async Task ExtractZipAsync(
        string zipPath,
        string destination,
        CancellationToken ct = default)
    {
        Directory.CreateDirectory(destination);

        await using var fs = File.OpenRead(zipPath);
        using var archive = new ZipArchive(fs, ZipArchiveMode.Read, leaveOpen: false);

        foreach (var entry in archive.Entries)
        {
            // Skip directory entries
            if (string.IsNullOrEmpty(entry.Name))
                continue;

            string outPath = Path.Combine(destination, entry.FullName);
            Directory.CreateDirectory(Path.GetDirectoryName(outPath)!);

            await using var entryStream = entry.Open();
            await using var outStream = File.Create(outPath);

            // Asynchronous copy avoids blocking the calling thread
            await entryStream.CopyToAsync(outStream, ct);

            Console.WriteLine($"Extracted: {entry.FullName}");
        }
    }
}

// Usage
await ZipExtractor.ExtractZipAsync("sample.zip", "./out", CancellationToken.None);`}
      />

      <Typography variant="h5">
        {t('dotnet-10-async-zip.content.sections.examples.create.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-10-async-zip.content.sections.examples.create.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using System.IO.Compression;
using System.Threading;
using System.Threading.Tasks;

public static class ZipCreator
{
    public static async Task CreateZipFromDirectoryAsync(
        string sourceDirectory,
        string zipPath,
        CancellationToken ct = default)
    {
        // New async API in .NET 10
        await ZipFile.CreateFromDirectoryAsync(
            sourceDirectory,
            zipPath,
            CompressionLevel.Optimal,
            includeBaseDirectory: false,
            ct);
    }
}

// Usage
await ZipCreator.CreateZipFromDirectoryAsync("./source", "archive.zip");`}
      />

      <Typography variant="h5">
        {t('dotnet-10-async-zip.content.sections.examples.gzip.title')}
      </Typography>
      <Typography paragraph>
        {t('dotnet-10-async-zip.content.sections.examples.gzip.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`using System;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Threading.Tasks;

async Task ReadConcatenatedGzipAsync(string path)
{
    await using var fileStream = File.OpenRead(path);
    await using var gzip = new GZipStream(fileStream, CompressionMode.Decompress);
    using var reader = new StreamReader(gzip, Encoding.UTF8);

    string content = await reader.ReadToEndAsync();
    Console.WriteLine(content);
}

// Works even if the file contains multiple gzip members concatenated
await ReadConcatenatedGzipAsync("data.gz");`}
      />
      <Typography paragraph>
        {t('dotnet-10-async-zip.content.sections.examples.gzip.benefits')}
      </Typography>

      <Typography variant="h4">
        {t('dotnet-10-async-zip.content.sections.benefits.title')}
      </Typography>
      <ul>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.benefits.list.better')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.benefits.list.async')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.benefits.list.cancellation')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.benefits.list.responsive')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.benefits.list.large')}
          </Typography>
        </li>
      </ul>

      <Typography variant="h4">
        {t('dotnet-10-async-zip.content.sections.keyPoints.title')}
      </Typography>
      <ul>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.keyPoints.list.noChange')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.keyPoints.list.auto')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.keyPoints.list.io')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.keyPoints.list.parallel')}
          </Typography>
        </li>
        <li>
          <Typography>
            {t('dotnet-10-async-zip.content.sections.keyPoints.list.gzip')}
          </Typography>
        </li>
      </ul>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a
            href="https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-10/libraries#zip-files"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('dotnet-10-async-zip.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('dotnet-10-async-zip.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DotNet10AsyncZip, meta };
export default DotNet10AsyncZip;
export { mod };
