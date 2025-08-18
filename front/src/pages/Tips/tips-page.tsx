import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Card, Typography, Box } from '@mui/material';
import { telerikTheme } from '../../theme/theme';
import { Header, Footer } from '../../components';
import { TipCardsGrid } from '../../components/tips/tip-cards-grid';
import { COLORS } from '../../styles/colors';
import { GridContainer, PromptsPageContainer } from '../Prompts/styles';

export const TipsPage: React.FC = () => {
	return (
		<ThemeProvider theme={telerikTheme}>
			<CssBaseline />
			<Header />
			<Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%' }}>
				<PromptsPageContainer sx={{ px: 0, mx: 0, width: '100%', ml: 2 }}>
					<Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 2, sm: 4 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
						<Box
								sx={{
									flex: { xs: '1 1 100%', md: '0 0 200px' },
									width: { xs: '100%', md: 200 },
									maxWidth: { xs: '100%', md: 210 },
									alignSelf: { xs: 'center', md: 'stretch' },
									position: 'relative',
									display: 'flex',
							}}
						>
							<Box
								component="img"
								src="/image-memo.png"
								alt="Illustration tips"
								sx={{
									width: '100%',
									height: '100%',
									objectFit: 'cover',
									display: 'block',
								}}
							/>
							</Box>
							<div style={{ position: 'relative', paddingLeft: '3rem' }}>
								<span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: COLORS.darkGreyBg }} />
								<Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%' }}>
									Une collection de fiches synthétiques sur des concepts fondamentaux de l'écosystème .NET et C#. Chaque tip vise à clarifier un point d'architecture, une interface clé ou une bonne pratique d'API. <br />
									Ne soyez pas surpris : les contenus des fiches ont été générés avec l'aide de l'IA.
								</Typography>
							</div>
						</Box>
				</PromptsPageContainer>
				<GridContainer>
								<Card
									variant="outlined"
									sx={{
										backgroundColor: COLORS.darkGreyBg,
										p: { xs: 2, md: 4 },
										boxShadow: 0,
										borderLeft: 0,
										borderRight: 0,
										width: '100%'
									}}
					>
						<TipCardsGrid />
					</Card>
				</GridContainer>
			</Container>
		<Footer />
		</ThemeProvider>
	);
};

export default TipsPage;
