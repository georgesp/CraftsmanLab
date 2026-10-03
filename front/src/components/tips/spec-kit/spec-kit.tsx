import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

type CommandItem = { name: string; title: string; description: string; example: string };
type ExampleItem = { title: string; description: string; prompt: string };

const macInstallCode = `# Prerequisites with Homebrew (uv can also download Python 3.11+ for you)
brew install uv git
uv --version

# Install the specify CLI
uv tool install specify-cli
specify version`;

const windowsInstallCode = `# PowerShell: prerequisites with winget
winget install --id=astral-sh.uv -e
winget install Git.Git

# Open a NEW terminal so the PATH is refreshed, then
uv --version
uv tool install specify-cli
specify version`;

const initNewCode = `# New project, interactive agent picker
specify init my-project

# Or choose the integration explicitly
specify init my-project --integration copilot
specify init my-project --integration claude
specify init my-project --integration codex`;

const initExistingCode = `# Existing repository: commit or stash first, then from the repo root
git switch -c chore/adopt-spec-kit
specify init --here --force --integration copilot

# Windows uses PowerShell scripts by default; force a variant if needed
specify init --here --force --integration claude --script ps`;

const maintenanceCode = `specify self check            # is a newer release available? (read-only)
specify self upgrade          # upgrade the CLI in place
specify integration upgrade copilot   # refresh the project's skill files
specify extension update      # refresh installed extensions`;

const treeCode = `my-project/
├── .specify/
│   ├── memory/constitution.md     # project principles
│   ├── scripts/                   # bash/, powershell/ or python/
│   ├── templates/                 # spec, plan, tasks, checklist templates
│   └── feature.json               # active feature directory
├── .github/skills/speckit-*/      # Copilot (.claude/skills/ for Claude Code...)
└── specs/
    └── 001-feature-name/
        ├── spec.md                # what and why
        ├── plan.md                # how: stack, architecture
        ├── research.md
        ├── data-model.md
        ├── contracts/
        ├── quickstart.md
        ├── checklists/
        └── tasks.md               # ordered, parallelizable tasks`;

const SpecKitTip: React.FC = () => {
  const { t } = useTranslation('tips');
  const k = 'spec-kit.content';

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

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.initTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.initNewDescription`)}</Typography>
      <CodeBlock language="bash" code={initNewCode} />
      <Typography paragraph>{t(`${k}.sections.install.initExistingDescription`)}</Typography>
      <CodeBlock language="bash" code={initExistingCode} />

      <Typography variant="h5" gutterBottom>
        {t(`${k}.sections.install.maintenanceTitle`)}
      </Typography>
      <Typography paragraph>{t(`${k}.sections.install.maintenanceDescription`)}</Typography>
      <CodeBlock language="bash" code={maintenanceCode} />
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
            href="https://github.com/github/spec-kit"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t(`${k}.footer.sourceLabel`)}
          </a>
          {' · '}
          <a
            href="https://github.github.io/spec-kit/"
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

const mod: TipModule = { default: SpecKitTip, meta };
export default SpecKitTip;
export { mod };
