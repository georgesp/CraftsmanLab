import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const installCode = `# Install Avalonia templates
dotnet new install Avalonia.Templates

# Create a desktop app
dotnet new avalonia.app -n MyApp

# Create a desktop app with MVVM pattern
dotnet new avalonia.mvvm -n MyMvvmApp

# Create a cross-platform app (Desktop + Mobile + WebAssembly)
dotnet new avalonia.xplat -n MyCrossPlatformApp`;

const xamlCode = `<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        x:Class="MyApp.MainWindow"
        Title="My Avalonia App"
        Width="400" Height="300">
  <StackPanel Margin="16" Spacing="8">
    <TextBlock Text="Enter your name:" />
    <TextBox Name="NameInput" Watermark="Name..." />
    <Button Content="Say Hello" Click="OnSayHelloClick" />
    <TextBlock Name="ResultText" FontWeight="Bold" />
  </StackPanel>
</Window>`;

const codeBehindCode = `using Avalonia.Controls;
using Avalonia.Interactivity;

namespace MyApp;

public partial class MainWindow : Window
{
    public MainWindow()
    {
        InitializeComponent();
    }

    private void OnSayHelloClick(object sender, RoutedEventArgs e)
    {
        ResultText.Text = $"Hello, {NameInput.Text}!";
    }
}`;

const mvvmViewModelCode = `using ReactiveUI;

namespace MyApp.ViewModels;

public class MainWindowViewModel : ReactiveObject
{
    private string _name = string.Empty;
    private string _greeting = string.Empty;

    public string Name
    {
        get => _name;
        set => this.RaiseAndSetIfChanged(ref _name, value);
    }

    public string Greeting
    {
        get => _greeting;
        set => this.RaiseAndSetIfChanged(ref _greeting, value);
    }

    public void SayHello() => Greeting = $"Hello, {Name}!";
}`;

const mvvmXamlCode = `<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:vm="clr-namespace:MyApp.ViewModels"
        x:Class="MyApp.MainWindow"
        x:DataType="vm:MainWindowViewModel">
  <StackPanel Margin="16" Spacing="8">
    <TextBox Text="{Binding Name}" Watermark="Enter name..." />
    <Button Content="Say Hello" Command="{Binding SayHelloCommand}" />
    <TextBlock Text="{Binding Greeting}" FontWeight="Bold" />
  </StackPanel>
</Window>`;

const windowsPublishCode = `# Self-contained single file for Windows x64
dotnet publish -r win-x64 -c Release --self-contained true \\
  -p:PublishSingleFile=true \\
  -p:IncludeNativeLibrariesForSelfExtract=true

# For Windows 32-bit
dotnet publish -r win-x86 -c Release --self-contained true \\
  -p:PublishSingleFile=true`;

const macPublishCode = `# Publish for Apple Silicon (arm64)
dotnet publish -r osx-arm64 -c Release --self-contained true -p:UseAppHost=true

# Publish for Intel Mac (x64)
dotnet publish -r osx-x64 -c Release --self-contained true -p:UseAppHost=true

# Create the .app bundle structure
APP="MyApp.app"
mkdir -p "$APP/Contents/MacOS"
mkdir -p "$APP/Contents/Resources"
cp Info.plist "$APP/Contents/"
cp -R ./bin/Release/net8.0/osx-arm64/publish/* "$APP/Contents/MacOS/"

# Make the binary executable (required when building on non-Unix)
chmod +x "$APP/Contents/MacOS/MyApp"

# Sign with Developer ID (requires Apple Developer account)
codesign --force --timestamp --options=runtime \\
  --entitlements MyApp.entitlements \\
  --sign "Developer ID Application: YourName" "$APP"`;

const infoPlistCode = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key>
  <string>MyApp</string>
  <key>CFBundleDisplayName</key>
  <string>My Avalonia App</string>
  <key>CFBundleIdentifier</key>
  <string>com.mycompany.myapp</string>
  <key>CFBundleVersion</key>
  <string>1.0.0</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0</string>
  <key>CFBundleExecutable</key>
  <string>MyApp</string>
  <key>LSMinimumSystemVersion</key>
  <string>10.14</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>`;

const mobileCode = `# Create a cross-platform project (Desktop + Mobile + WebAssembly)
dotnet new avalonia.xplat -n MyCrossPlatformApp
cd MyCrossPlatformApp

# Project structure generated:
# MyCrossPlatformApp/          <- Shared UI code
# MyCrossPlatformApp.Desktop/  <- Desktop entry point
# MyCrossPlatformApp.Android/  <- Android entry point
# MyCrossPlatformApp.iOS/      <- iOS entry point (build on macOS only)

# Run on Android
dotnet run --project MyCrossPlatformApp.Android

# Run on iOS (requires macOS + Xcode)
dotnet run --project MyCrossPlatformApp.iOS`;

const AvaloniaUiTip: React.FC = () => {
  const { t } = useTranslation('tips');

  const tocAnchors = [
    { anchor: 'what-is-it', key: 0 },
    { anchor: 'installation', key: 1 },
    { anchor: 'examples', key: 2 },
    { anchor: 'deploy-windows', key: 3 },
    { anchor: 'deploy-mac', key: 4 },
    { anchor: 'mobile', key: 5 },
  ];

  const architectureItems = t('avalonia.content.sections.whatIsIt.architectureItems', {
    returnObjects: true,
  }) as string[];

  const templateItems = t('avalonia.content.sections.installation.templateItems', {
    returnObjects: true,
  }) as string[];

  const ideItems = t('avalonia.content.sections.installation.ideItems', {
    returnObjects: true,
  }) as string[];

  const compatItems = t('avalonia.content.sections.mobile.compatItems', {
    returnObjects: true,
  }) as string[];

  const limitationItems = t('avalonia.content.sections.mobile.limitationItems', {
    returnObjects: true,
  }) as string[];

  const tocItems = t('avalonia.content.tocItems', { returnObjects: true }) as string[];

  return (
    <TipContent>
      <Typography variant="h3" gutterBottom>
        {t('avalonia.content.mainTitle')}
      </Typography>

      <Typography paragraph>{t('avalonia.content.intro')}</Typography>

      {/* Table of contents */}
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }} id="toc">
        {t('avalonia.content.tocTitle')}
      </Typography>
      <Box component="ul">
        {tocAnchors.map((s) => (
          <li key={s.anchor}>
            <a href={`#${s.anchor}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
              {Array.isArray(tocItems) ? tocItems[s.key] : ''}
            </a>
          </li>
        ))}
      </Box>

      {/* Section 1 — What is Avalonia? */}
      <Typography variant="h4" gutterBottom id="what-is-it">
        {t('avalonia.content.sections.whatIsIt.title')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.whatIsIt.description')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.whatIsIt.architectureTitle')}
      </Typography>
      <Box component="ul">
        {Array.isArray(architectureItems) &&
          architectureItems.map((item, i) => (
            <li key={i}>
              <Typography component="span">{item}</Typography>
            </li>
          ))}
      </Box>

      {/* Section 2 — Installation */}
      <Typography variant="h4" gutterBottom id="installation">
        {t('avalonia.content.sections.installation.title')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.installation.description')}</Typography>
      <CodeBlock language="bash" code={installCode} />
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.installation.templatesTitle')}
      </Typography>
      <Box component="ul">
        {Array.isArray(templateItems) &&
          templateItems.map((item, i) => (
            <li key={i}>
              <Typography component="span">{item}</Typography>
            </li>
          ))}
      </Box>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.installation.ideTitle')}
      </Typography>
      <Box component="ul">
        {Array.isArray(ideItems) &&
          ideItems.map((item, i) => (
            <li key={i}>
              <Typography component="span">{item}</Typography>
            </li>
          ))}
      </Box>

      {/* Section 3 — Code examples */}
      <Typography variant="h4" gutterBottom id="examples">
        {t('avalonia.content.sections.examples.title')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.examples.xamlTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.examples.xamlDescription')}</Typography>
      <CodeBlock language="xml" code={xamlCode} />

      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.examples.codeBehindTitle')}
      </Typography>
      <Typography paragraph>
        {t('avalonia.content.sections.examples.codeBehindDescription')}
      </Typography>
      <CodeBlock language="csharp" code={codeBehindCode} />

      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.examples.mvvmTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.examples.mvvmDescription')}</Typography>
      <CodeBlock language="csharp" code={mvvmViewModelCode} />
      <CodeBlock language="xml" code={mvvmXamlCode} />

      {/* Section 4 — Windows deployment */}
      <Typography variant="h4" gutterBottom id="deploy-windows">
        {t('avalonia.content.sections.deployWindows.title')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.deployWindows.description')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployWindows.publishTitle')}
      </Typography>
      <Typography paragraph>
        {t('avalonia.content.sections.deployWindows.publishDescription')}
      </Typography>
      <CodeBlock language="bash" code={windowsPublishCode} />
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployWindows.innoTitle')}
      </Typography>
      <Typography paragraph>
        {t('avalonia.content.sections.deployWindows.innoDescription')}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployWindows.storeTitle')}
      </Typography>
      <Typography paragraph>
        {t('avalonia.content.sections.deployWindows.storeDescription')}
      </Typography>

      {/* Section 5 — macOS deployment */}
      <Typography variant="h4" gutterBottom id="deploy-mac">
        {t('avalonia.content.sections.deployMac.title')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.deployMac.description')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployMac.bundleTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.deployMac.bundleDescription')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployMac.publishTitle')}
      </Typography>
      <Typography paragraph>
        {t('avalonia.content.sections.deployMac.publishDescription')}
      </Typography>
      <CodeBlock language="bash" code={macPublishCode} />
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployMac.plistTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.deployMac.plistDescription')}</Typography>
      <CodeBlock language="xml" code={infoPlistCode} />
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.deployMac.signTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.deployMac.signDescription')}</Typography>

      {/* Section 6 — Mobile */}
      <Typography variant="h4" gutterBottom id="mobile">
        {t('avalonia.content.sections.mobile.title')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.mobile.description')}</Typography>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.mobile.compatTitle')}
      </Typography>
      <Box component="ul">
        {Array.isArray(compatItems) &&
          compatItems.map((item, i) => (
            <li key={i}>
              <Typography component="span">{item}</Typography>
            </li>
          ))}
      </Box>
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.mobile.setupTitle')}
      </Typography>
      <Typography paragraph>{t('avalonia.content.sections.mobile.setupDescription')}</Typography>
      <CodeBlock language="bash" code={mobileCode} />
      <Typography variant="h5" gutterBottom>
        {t('avalonia.content.sections.mobile.limitationsTitle')}
      </Typography>
      <Box component="ul">
        {Array.isArray(limitationItems) &&
          limitationItems.map((item, i) => (
            <li key={i}>
              <Typography component="span">{item}</Typography>
            </li>
          ))}
      </Box>

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
            href="https://docs.avaloniaui.net/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'underline' }}
          >
            {t('avalonia.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          {t('avalonia.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: AvaloniaUiTip, meta };
export default AvaloniaUiTip;
export { mod };
