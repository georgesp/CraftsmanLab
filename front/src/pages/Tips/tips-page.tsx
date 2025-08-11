import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Card, Typography } from '@mui/material';
import { telerikTheme } from '../../theme/theme';
import { Header } from '../../components';
import { TipCardsGrid } from '../../components/tips/tip-cards-grid';
import { COLORS } from '../../utils/colors';
import { GridContainer, PromptsPageContainer } from '../Prompts/styles';

export const TipsPage: React.FC = () => {
	return (
		<ThemeProvider theme={telerikTheme}>
			<CssBaseline />
			<Header />
			<Container maxWidth="lg">
				<PromptsPageContainer>
					<Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
						Tips .NET / C#
					</Typography>
					<Typography variant="body1">
						Une collection de fiches synthétiques sur des concepts fondamentaux de l'écosystème .NET et C#. Chaque tip vise à clarifier un point d'architecture, une interface clé ou une bonne pratique d'API.
					</Typography>
				</PromptsPageContainer>
				<GridContainer>
					<Card
						variant="outlined"
						sx={{
							backgroundColor: COLORS.lightBlueBg,
							borderRadius: 1,
							p: { xs: 2, md: 4 },
							boxShadow: 0,
							maxWidth: 1200,
							mx: 'auto',
						}}
					>
						<TipCardsGrid />
					</Card>
				</GridContainer>
			</Container>
		</ThemeProvider>
	);
};

export default TipsPage;
