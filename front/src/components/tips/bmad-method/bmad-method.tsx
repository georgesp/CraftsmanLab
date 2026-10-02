import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

type CommandItem = { name: string; title: string; description: string; example: string };
type ExampleItem = { title: string; description: string; prompt: string };
type AgentItem = { name: string; role: string; skill: string; codes: string };

const macInstallCode = `# Prerequisites with Homebrew
brew install node git uv

# Check the versions (Node.js 20.12 or later)
node -v
git --version
uv --version

# Install the BMad skills from your project folder
cd ~/dev/my-project
npx skills add bmad-code-org/BMAD-METHOD`;

const windowsInstallCode = `# PowerShell: prerequisites with winget
winget install OpenJS.NodeJS.LTS
winget install Git.Git
winget install astral-sh.uv

# Open a NEW terminal so the PATH is refreshed, then check
node -v
git --version
uv --version

# Install the BMad skills from your project folder
cd C:\\dev\\my-project
npx skills add bmad-code-org/BMAD-METHOD`;

const windowsPolicyCode = `# Only if PowerShell refuses to run npx.ps1
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`;

const minimalInstallCode = `npx skills add bmad-code-org/BMAD-METHOD \\
  --skill bmad --skill bmod-core-tools --skill bmod-method \\
  --skill bmad-build --skill bmad-ticket`;

const pluginInstallCode = `# Inside Claude Code
/plugin marketplace add bmad-code-org/bmad-plugins

# From a terminal, for Codex
codex plugin marketplace add bmad-code-org/bmad-plugins`;

const setupCode = `# Open your AI tool in the project (example with Claude Code)
claude

# Then, in the chat
/bmad setup
/bmad status`;

const treeCode = `my-project/
├── .claude/skills/          # installed skills (.agents/skills/ for Codex, Cursor...)
│   ├── bmad/
│   ├── bmad-build/
│   └── ...
├── _bmad/                   # shared runtime, scripts and config
│   └── custom/              # your overrides, kept across updates
├── _bmad-output/            # every document BMad writes
│   └── initiative-<slug>/
│       ├── spec-<slug>/
│       ├── architecture-<slug>/
│       └── ...
└── AGENTS.md                # project context for every agent`;

const workflowTreeCode = `_bmad-output/initiative-appointment-reminders/
├── initiative-appointment-reminders.md
├── tickets.toml                 # epics in build order
├── forge-appointment-reminders/
├── architecture-appointment-reminders/
├── spec-appointment-reminders/
├── epic-reminders/
│   ├── epic-reminders.md
│   ├── tickets.toml             # stories in build order
│   ├── story-<slug>-plan.md     # one plan per Build session, with its status
│   └── ...                      # retrospective document at the end
└── deferred-work.md             # follow-ups spotted along the way`;

const BmadMethodTip: React.FC = () => {
  const { t } = useTranslation('tips');
  const k = 'bmad-method.content';

  const tocAnchors = [
    { anchor: 'what-is', key: 0 },
    { anchor: 'concepts', key: 1 },
    { anchor: 'install', key: 2 },
    { anchor: 'commands', key: 3 },
    { anchor: 'comparison', key: 4 },
    { anchor: 'dev-examples', key: 5 },
    { anchor: 'workflow', key: 6 },
  ];

  const list = <T,>(key: string): T[] => {
    const value = t(key, { returnObjects: true });
    return Array.isArray(value) ? (value as T[]) : [];
  };

  const tocItems = list<string>(`${k}.tocItems`);
  const whatIsPoints = list<string>(`${k}.sections.whatIs.points`);
  const conceptItems = list<string>(`${k}.sections.concepts.items`);
  const agents = list<AgentItem>(`${k}.sections.concepts.agents`);
  const prereqItems = list<string>(`${k}.sections.install.prereqItems`);
  const commands = list<CommandItem>(`${k}.sections.commands.items`);
  const bonusItems = list<string>(`${k}.sections.commands.bonusItems`);
  const prosItems = list<string>(`${k}.sections.comparison.prosItems`);
  const consItems = list<string>(`${k}.sections.comparison.consItems`);
  const devExamples = list<ExampleItem>(`${k}.sections.devExamples.items`);
  const steps = list<ExampleItem>(`${k}.sections.workflow.steps`);
  const workflowTips = list<string>(`${k}.sections.workflow.tips`);

  const renderList = (items: string[]) => (
    <Box component="ul">
      {items.map((item, i) => (
        <li key={i}>
          <Typography component="span">{item}</Typography>
        </li>
      ))}
    </Box>
  );

  const renderPromptCards = (items: ExampleItem[], numbered: boolean) =>
    items.map((item, i) => (
      <Box key={i} sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          {numbered ? `${i + 1}. ${item.title}` : item.title}
        </Typography>
        <Typography paragraph>{item.description}</Typography>
        <CodeBlock language="bash" code={item.prompt} />
      </Box>
    ));

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t(`${k}.mainTitle`)}
      </Typography>

      <Typography paragraph>{t(`${k}.intro`)}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t(`${k}.tocTitle`)}
      </Typography>
      <Box component="ul">
        {tocAnchors.map((s) => (
          <li key={s.anchor}>
            <a href={`#${s.anchor}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {tocItems[s.key] ?? ''}
            </a>
          </li>
        ))}
      </Box>

      {/* Section 1: what is it */}
      <Typography variant="h4" gutterBottom id="what-is">
        {t(`${k}.sections.whatIs.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.whatIs.description`)}</Typography>
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.whatIs.pointsTitle`)}
      </Typography>
      {renderList(whatIsPoints)}

      {/* Section 2: concepts */}
      <Typography variant="h4" gutterBottom id="concepts">
        {t(`${k}.sections.concepts.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.concepts.description`)}</Typography>
      {renderList(conceptItems)}
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.concepts.agentsTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.concepts.agentsDescription`)}</Typography>
      <Box component="ul">
        {agents.map((agent) => (
          <li key={agent.skill}>
            <Typography component="span">
              <strong>{agent.name}</strong> ({agent.role}) — <code>{agent.skill}</code> ·{' '}
              {agent.codes}
            </Typography>
          </li>
        ))}
      </Box>
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.concepts.treeTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.concepts.treeDescription`)}</Typography>
      <CodeBlock language="bash" code={treeCode} />

      {/* Section 3: install */}
      <Typography variant="h4" gutterBottom id="install">
        {t(`${k}.sections.install.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.description`)}</Typography>
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.prereqTitle`)}
      </Typography>
      {renderList(prereqItems)}

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.macTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.macDescription`)}</Typography>
      <CodeBlock language="bash" code={macInstallCode} />

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.windowsTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.windowsDescription`)}</Typography>
      <CodeBlock language="bash" code={windowsInstallCode} />
      <Typography paragraph>{t(`${k}.sections.install.windowsNote`)}</Typography>
      <CodeBlock language="bash" code={windowsPolicyCode} />

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.skillsTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.skillsDescription`)}</Typography>
      <CodeBlock language="bash" code={minimalInstallCode} />
      <Typography paragraph>{t(`${k}.sections.install.pluginDescription`)}</Typography>
      <CodeBlock language="bash" code={pluginInstallCode} />

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.setupTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.setupDescription`)}</Typography>
      <CodeBlock language="bash" code={setupCode} />
      <Typography paragraph>{t(`${k}.sections.install.updateDescription`)}</Typography>
      <Typography paragraph>{t(`${k}.sections.install.legacyNote`)}</Typography>

      {/* Section 4: commands */}
      <Typography variant="h4" gutterBottom id="commands">
        {t(`${k}.sections.commands.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.commands.description`)}</Typography>
      <Typography paragraph>{t(`${k}.sections.commands.invokeNote`)}</Typography>
      {commands.map((cmd, i) => (
        <Box key={cmd.name} sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {`${i + 1}. ${cmd.name}`}
          </Typography>
          <Typography paragraph sx={{ fontWeight: 600 }}>
            {cmd.title}
          </Typography>
          <Typography paragraph>{cmd.description}</Typography>
          <CodeBlock language="bash" code={cmd.example} />
        </Box>
      ))}
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.commands.bonusTitle`)}
      </Typography>
      {renderList(bonusItems)}

      {/* Section 5: comparison */}
      <Typography variant="h4" gutterBottom id="comparison">
        {t(`${k}.sections.comparison.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.comparison.description`)}</Typography>
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.comparison.prosTitle`)}
      </Typography>
      {renderList(prosItems)}
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.comparison.consTitle`)}
      </Typography>
      {renderList(consItems)}
      <Typography paragraph>{t(`${k}.sections.comparison.verdict`)}</Typography>

      {/* Section 6: developer examples */}
      <Typography variant="h4" gutterBottom id="dev-examples">
        {t(`${k}.sections.devExamples.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.devExamples.description`)}</Typography>
      {renderPromptCards(devExamples, false)}

      {/* Section 7: concrete workflow */}
      <Typography variant="h4" gutterBottom id="workflow">
        {t(`${k}.sections.workflow.title`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.workflow.description`)}</Typography>
      {renderPromptCards(steps, true)}
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.workflow.resultTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.workflow.result`)}</Typography>
      <CodeBlock language="bash" code={workflowTreeCode} />
      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.workflow.tipsTitle`)}
      </Typography>
      {renderList(workflowTips)}

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
          <a
            href="https://github.com/bmad-code-org/BMAD-METHOD"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t(`${k}.footer.sourceLabel`)}
          </a>
          {' · '}
          <a
            href="https://docs.bmad-method.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t(`${k}.footer.docsLabel`)}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t(`${k}.footer.writtenOn`, { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: BmadMethodTip, meta };
export default BmadMethodTip;
export { mod };
