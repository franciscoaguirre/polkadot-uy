export const languages = {
	es: 'Español',
	en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'es';

export const ui = {
	es: {
		// Navigation
		'nav.home': 'Inicio',
		'nav.news': 'Noticias',
		'nav.about': 'Nosotros',
		'nav.community': 'Comunidad',

		// Newsletter
		'newsletter.title': 'Suscríbete al Newsletter',
		'newsletter.description': 'Recibe las últimas noticias de Polkadot en Uruguay',
		'newsletter.placeholder': 'Tu email',
		'newsletter.button': 'Suscribirse',
		'newsletter.success': '¡Suscripción exitosa! Revisa tu email.',
		'newsletter.error': 'Error al suscribirse. Intenta nuevamente.',
		'newsletter.alreadySubscribed': 'Ya estás suscrito a nuestro newsletter',
		'newsletter.invalidEmail': 'Por favor ingresa un email válido',

		// Articles
		'article.readMore': 'Leer más',
		'article.publishedOn': 'Publicado el',
		'article.by': 'por',
		'article.relatedArticles': 'Artículos relacionados',
		'article.backToNews': 'Volver a noticias',
		'article.shareArticle': 'Compartir artículo',

		// News listing
		'news.title': 'Noticias',
		'news.subtitle': 'Últimas novedades de Polkadot en Uruguay',
		'news.featuredArticles': 'Artículos destacados',
		'news.allArticles': 'Todos los artículos',
		'news.noArticles': 'No hay artículos disponibles',
		'news.loadMore': 'Cargar más',

		// Footer
		'footer.madeIn': 'Hecho en Uruguay',
		'footer.community': 'Comunidad',
		'footer.resources': 'Recursos',
		'footer.social': 'Síguenos',
		'footer.polkadotOfficial': 'Polkadot Oficial',
		'footer.polkadotWiki': 'Polkadot Wiki',
		'footer.substrate': 'Substrate',

		// Common
		'common.loading': 'Cargando...',
		'common.error': 'Error',
		'common.close': 'Cerrar',
		'common.search': 'Buscar',
		'common.menu': 'Menú',
		'common.darkMode': 'Modo oscuro',
		'common.lightMode': 'Modo claro',

		// External links
		'externalLink.opensInNewTab': '(abre en una nueva pestaña)',
	},
	en: {
		// Navigation
		'nav.home': 'Home',
		'nav.news': 'News',
		'nav.about': 'About',
		'nav.community': 'Community',

		// Newsletter
		'newsletter.title': 'Subscribe to Newsletter',
		'newsletter.description': 'Get the latest Polkadot news from Uruguay',
		'newsletter.placeholder': 'Your email',
		'newsletter.button': 'Subscribe',
		'newsletter.success': 'Successfully subscribed! Check your email.',
		'newsletter.error': 'Error subscribing. Please try again.',
		'newsletter.alreadySubscribed': 'You are already subscribed to our newsletter',
		'newsletter.invalidEmail': 'Please enter a valid email',

		// Articles
		'article.readMore': 'Read more',
		'article.publishedOn': 'Published on',
		'article.by': 'by',
		'article.relatedArticles': 'Related articles',
		'article.backToNews': 'Back to news',
		'article.shareArticle': 'Share article',

		// News listing
		'news.title': 'News',
		'news.subtitle': 'Latest Polkadot news from Uruguay',
		'news.featuredArticles': 'Featured articles',
		'news.allArticles': 'All articles',
		'news.noArticles': 'No articles available',
		'news.loadMore': 'Load more',

		// Footer
		'footer.madeIn': 'Made in Uruguay',
		'footer.community': 'Community',
		'footer.resources': 'Resources',
		'footer.social': 'Follow us',
		'footer.polkadotOfficial': 'Official Polkadot',
		'footer.polkadotWiki': 'Polkadot Wiki',
		'footer.substrate': 'Substrate',

		// Common
		'common.loading': 'Loading...',
		'common.error': 'Error',
		'common.close': 'Close',
		'common.search': 'Search',
		'common.menu': 'Menu',
		'common.darkMode': 'Dark mode',
		'common.lightMode': 'Light mode',

		// External links
		'externalLink.opensInNewTab': '(opens in new tab)',
	},
} as const;

export function getLangFromUrl(url: URL): Language {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as Language;
	return defaultLang;
}

export function useTranslations(lang: Language) {
	return function t(key: keyof typeof ui[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function getLocalizedPath(path: string, lang: Language): string {
	if (lang === defaultLang) {
		return path;
	}
	return `/${lang}${path}`;
}

export function switchLanguagePath(currentPath: string, newLang: Language): string {
	// Remove current language prefix if exists
	const pathWithoutLang = currentPath.replace(/^\/(es|en)/, '') || '/';
	return getLocalizedPath(pathWithoutLang, newLang);
}
