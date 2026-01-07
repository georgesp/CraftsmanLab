import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, List, ListItem } from '@mui/material';
import Link from '@mui/material/Link';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const MicrosoftExtensionsAITip: React.FC = () => {
  const { t } = useTranslation('tips');

  const _useCasesRaw = t('microsoft-extensions-ai.content.useCases.items', {
    returnObjects: true,
  });
  const useCases: string[] = Array.isArray(_useCasesRaw)
    ? _useCasesRaw
    : typeof _useCasesRaw === 'string'
      ? [_useCasesRaw]
      : [];

  const _capabilitiesRaw = t('microsoft-extensions-ai.content.sections.interfaces.chatClient.capabilities', {
    returnObjects: true,
  });
  const capabilities: string[] = Array.isArray(_capabilitiesRaw)
    ? _capabilitiesRaw
    : typeof _capabilitiesRaw === 'string'
      ? [_capabilitiesRaw]
      : [];

  const _benefitsRaw = t('microsoft-extensions-ai.content.sections.benefits.items', {
    returnObjects: true,
  });
  const benefits: Array<any> = Array.isArray(_benefitsRaw) ? _benefitsRaw : [];

  const _bestPracticesRaw = t('microsoft-extensions-ai.content.sections.bestPractices.items', {
    returnObjects: true,
  });
  const bestPractices: Array<any> = Array.isArray(_bestPracticesRaw) ? _bestPracticesRaw : [];

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('microsoft-extensions-ai.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('microsoft-extensions-ai.content.intro')}</Typography>

      <Typography paragraph>{t('microsoft-extensions-ai.content.useCases.title')}</Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {useCases.map((item, idx) => (
          <ListItem key={idx} sx={{ display: 'list-item', py: 0.5 }}>
            {item}
          </ListItem>
        ))}
      </List>

      <Typography paragraph>{t('microsoft-extensions-ai.content.summary')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.packages.title')}
      </Typography>

      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.packages.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.packages.abstractions.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.packages.abstractions.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.packages.core.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.packages.core.description')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.packages.installation.title')}
      </Typography>
      <CodeBlock
        language="bash"
        code={t('microsoft-extensions-ai.content.sections.packages.installation.code', {
          defaultValue:
            '# Main package\ndotnet add package Microsoft.Extensions.AI\n\n# Or only abstractions (for libraries)\ndotnet add package Microsoft.Extensions.AI.Abstractions',
        })}
      />

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.interfaces.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.interfaces.chatClient.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.interfaces.chatClient.description')}
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {capabilities.map((cap, idx) => (
          <ListItem key={idx} sx={{ display: 'list-item', py: 0.5 }}>
            {cap}
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.interfaces.embeddingGenerator.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.interfaces.embeddingGenerator.description')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.interfaces.imageGenerator.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.interfaces.imageGenerator.description')}
      </Typography>

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.examples.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.examples.basicChat.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.examples.basicChat.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`public class ChatService
{
    private readonly IChatClient _chatClient;

    public ChatService(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    public async Task<string> GetResponseAsync(string userMessage)
    {
        var response = await _chatClient.CompleteAsync(userMessage);
        return response.Message.Text;
    }
}`}
      />

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.examples.streaming.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.examples.streaming.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`await foreach (var update in _chatClient.CompleteStreamingAsync(messages))
{
    Console.Write(update.Text);
}`}
      />

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.examples.middleware.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.examples.middleware.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`services.AddChatClient(builder => builder
    .Use(OpenAIChatClient("gpt-4"))
    .UseOpenTelemetry(loggerFactory)
    .UseDistributedCache());`}
      />
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.examples.middleware.explanation')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.examples.embeddings.title')}
      </Typography>
      <Typography paragraph>
        {t('microsoft-extensions-ai.content.sections.examples.embeddings.description')}
      </Typography>
      <CodeBlock
        language="csharp"
        code={`var generator = new OpenAIEmbeddingGenerator(apiKey, "text-embedding-3-small");
var embeddings = await generator.GenerateAsync(new[] { "Hello world", "AI is amazing" });

foreach (var embedding in embeddings)
{
    Console.WriteLine($"Vector length: {embedding.Vector.Length}");
}`}
      />

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.benefits.title')}
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {benefits.map((benefit, idx) => (
          <ListItem key={idx} sx={{ display: 'list-item', py: 0.5 }}>
            <strong>{benefit.title}</strong>: {benefit.description}
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.bestPractices.title')}
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        {bestPractices.map((practice, idx) => (
          <ListItem key={idx} sx={{ display: 'list-item', py: 0.5 }}>
            <strong>{practice.rule}</strong>: {practice.reason}
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" gutterBottom>
        {t('microsoft-extensions-ai.content.sections.resources.title')}
      </Typography>
      <List sx={{ listStyleType: 'disc', pl: 4 }}>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <Link
            href="https://learn.microsoft.com/en-us/dotnet/ai/microsoft-extensions-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('microsoft-extensions-ai.content.sections.resources.officialDocs')}
          </Link>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <Link
            href="https://aka.ms/meai-samples"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('microsoft-extensions-ai.content.sections.resources.samples')}
          </Link>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5 }}>
          <Link
            href="https://github.com/dotnet/eShopSupport"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('microsoft-extensions-ai.content.sections.resources.eshopSupport')}
          </Link>
        </ListItem>
      </List>

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
            href="https://learn.microsoft.com/en-us/dotnet/ai/microsoft-extensions-ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('microsoft-extensions-ai.content.footer.sourceLabel')}
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('microsoft-extensions-ai.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: MicrosoftExtensionsAITip, meta };
export default MicrosoftExtensionsAITip;
export { mod };
