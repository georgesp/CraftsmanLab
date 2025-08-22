import React from 'react';
import { Container, Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { telerikTheme } from '../../theme/theme';
import { Header, Footer, ScrollToTopButton } from '../../components';
import { PageLayout, ScrollToTopButton } from '../../components';
import { TipCardsGrid } from '../../components/tips/tip-cards-grid';
import { COLORS } from '../../styles/colors';
import { GridContainer, PromptsPageContainer } from '../Prompts/styles';

export const TipsPage: React.FC = () => {
	const { t } = useTranslation('pages');

	return (
		<PageLayout>
					<Container maxWidth={false} disableGutters sx={{ px: 0, mx: 0, width: '100%', backgroundColor: COLORS.darkGreyBg }}>
				<PromptsPageContainer sx={{ px: 0, mx: 0, width: '100%', ml: { xs: 0, md: 6 }, mb: 0 }}>
					<Box sx={{ display: 'flex', alignItems: 'stretch', gap: { xs: 1, sm: 2 }, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
						<Box
							sx={{
								flex: { xs: '1 1 100%', md: '0 0 160px' },
								width: { xs: '100%', md: 160 },
								maxWidth: { xs: '100%', md: 160 },
								alignSelf: { xs: 'center', md: 'stretch' },
								position: 'relative',
								display: 'flex',
								mr: 2,
								mb: { xs: 2, md: 1 },
							}}
						>
							<Box
								component="img"
								src="/image-memo-white.png"
								alt="Illustration tips"
								sx={{
									width: 160,
									height: 'auto',
									objectFit: 'contain',
									display: 'block',
								}}
							/
							>
						</Box>
							<Box sx={{ position: 'relative', pl: { xs: 0, md: '3rem' }, pr: 0, flex: 1, width: { xs: '100%', md: 'auto' }, mr: { xs: 0, md: 0 } }}>
								<Box component="span" sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: COLORS.darkGreyBg, display: { xs: 'none', md: 'block' } }} />
								<Typography variant="body1" sx={{ px: 0, mx: 0, width: '100%', color: 'text.primary' }}>
									{t('tips.description')} <br />
									{t('tips.aiNote')}
								</Typography>

							</Box>
						</Box>
				</PromptsPageContainer>
				<GridContainer sx={{ pt: 0 }}>
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
				<ScrollToTopButton />
		</PageLayout>
	);
};

export default TipsPage;
