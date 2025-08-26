import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { TipContent } from '../../ui';
import { meta } from './meta';

const KokoroSharpTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const _featuresRaw = t('kokoro-sharp.content.features.rows', { returnObjects: true });
  const features: Array<{ feature: string; value: string }>
    = Array.isArray(_featuresRaw) ? _featuresRaw as any : [];

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('kokoro-sharp.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('kokoro-sharp.content.intro')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('kokoro-sharp.content.sections.installation.title')}
      </Typography>
      <CodeBlock
        language="bash"
        code={t('kokoro-sharp.content.sections.installation.nugetCpu', { defaultValue: 'dotnet add package KokoroSharp.CPU' })}
      />
      <Typography paragraph>{t('kokoro-sharp.content.sections.installation.note')}</Typography>

      <Typography variant="h4" gutterBottom>
        {t('kokoro-sharp.content.sections.gettingStarted.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="kokoro-basic"
        code={`using KokoroSharp;

// Load or download the model (~320MB for full precision)
KokoroTTS tts = KokoroTTS.LoadModel();

// Pick a voice (included in the nuget package)
KokoroVoice heart = KokoroVoiceManager.GetVoice("af_heart");

// Speak a sentence (language detection is automatic based on the voice)
tts.SpeakFast("Bonjour le monde", heart);
`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('kokoro-sharp.content.sections.examples.streaming.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="kokoro-streaming"
        code={`using KokoroSharp;
using System.Threading.Channels;

var tts = KokoroTTS.LoadModel();
var voice = KokoroVoiceManager.GetVoice("af_alloy");

// Stream segments as they are synthesized
await foreach (var segment in tts.StreamSegmentsAsync("Texte long à lire", voice))
{
    // segment.Audio contains PCM bytes you can enqueue to a player
    Console.WriteLine($"Received segment: {segment.Index}, {segment.DurationMs}ms");
}`}
      />

      <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
        {t('kokoro-sharp.content.sections.examples.voiceMixing.title')}
      </Typography>
      <CodeBlock
        language="csharp"
        ariaLabel="kokoro-voice-mix"
        code={`using KokoroSharp;

var tts = KokoroTTS.LoadModel();
var mix = new KokoroVoiceMix()
    .Add(KokoroVoiceManager.GetVoice("af_heart"), weight: 0.6f)
    .Add(KokoroVoiceManager.GetVoice("af_alloy"), weight: 0.4f);

tts.SpeakFast("Mixage de voix en temps réel", mix);
`}
      />

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('kokoro-sharp.content.sections.features.title')}
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>{t('kokoro-sharp.content.sections.features.table.headers.0')}</strong>
              </TableCell>
              <TableCell>
                <strong>{t('kokoro-sharp.content.sections.features.table.headers.1')}</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((r, i) => (
              <TableRow key={i}>
                <TableCell>{r.feature}</TableCell>
                <TableCell>{r.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        {t('kokoro-sharp.content.sections.notes.title')}
      </Typography>
      <Typography component="ul" sx={{ ml: 2 }}>
        {(t('kokoro-sharp.content.sections.notes.items', { returnObjects: true }) as string[]).map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </Typography>

      <Box
        mt={4}
        pt={2}
        borderTop={(theme) => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          {t('kokoro-sharp.content.footer.sourcesLabel')}{' '}
          <Link href="https://github.com/Lyrcaxis/KokoroSharp" target="_blank" rel="noopener noreferrer" underline="always" color="inherit">
            GitHub (KokoroSharp)
          </Link>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('kokoro-sharp.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: KokoroSharpTip, meta };
export default KokoroSharpTip;
export { mod };
