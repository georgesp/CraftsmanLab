import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Card, Typography } from '@mui/material';
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
					<div style={{ position: 'relative', paddingLeft: '3rem' }}>
						<span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: COLORS.darkGreyBg }} />
					<Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%' }}>
						Une collection de fiches synthétiques sur des concepts fondamentaux de l'écosystème .NET et C#. Chaque tip vise à clarifier un point d'architecture, une interface clé ou une bonne pratique d'API.
					</Typography>
					</div>
				</PromptsPageContainer>
				<GridContainer>
								<Card
									variant="outlined"
									sx={{
										backgroundColor: COLORS.darkGreyBg,
										borderRadius: '12px',
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
