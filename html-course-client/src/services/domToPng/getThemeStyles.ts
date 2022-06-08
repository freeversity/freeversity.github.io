// import resolveUrl from 'resolve-url';

// let themeStyles: SVGStyleElement | undefined;

// const latinUnicodeRange = 'U+0-FF, U+131, U+152-153, U+2BB-2BC, U+2C6, U+2DA, U+2DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
// const latinUnicodeRangeSafari = 'U+0-ff, U+131-131, U+152-153, U+2bb-2bc, U+2c6-2c6, U+2da-2da, U+2dc-2dc, U+2000-206f, U+2074-2074, U+20ac-20ac, U+2122-2122, U+2191-2191, U+2193-2193, U+2212-2212, U+2215-2215, U+feff-feff, U+fffd-fffd';

// export async function getThemeStyles(
//     dataService: DataService,
// ): Promise<SVGStyleElement | undefined> {
//     if (!themeStyles) {
//         themeStyles = await collectThemeStyles(dataService);
//     }

//     return themeStyles && themeStyles.cloneNode(true) as SVGStyleElement;
// }

// async function collectThemeStyles(
//     dataService: DataService,
// ): Promise<SVGStyleElement | undefined> {
//     const themesPath = resolveUrl(dataService.apiOrigin, '/resources/themes');
//     let themeStylesheet: CSSStyleSheet | undefined;

//     for (let i = 0, len = document.styleSheets.length; i < len; i += 1) {
//         const stylesheet = document.styleSheets[i];

//         if (
//             stylesheet instanceof CSSStyleSheet &&
//             stylesheet.href &&
//             stylesheet.href.startsWith(themesPath)
//         ) {
//             themeStylesheet = stylesheet;
//             break;
//         }
//     }

//     if (!themeStylesheet) return;

//     const themeRules = await getExternalRules(dataService, themeStylesheet);

//     const importedStyles = themeRules.filter(
//         rule => rule instanceof CSSImportRule,
//     ) as CSSImportRule[];


//     const importRulesArrays = await Promise.all(importedStyles.map(
//         rule => getExternalRules(dataService, rule.styleSheet),
//     ));

//     importRulesArrays
//         .forEach((rules) => {
//             if (!rules) return;

//             themeRules.unshift(...rules);
//         });

//     const themeStyleString = rulesToString(themeRules);

//     const themeStyleElem = document.createElementNS('http://www.w3.org/2000/svg', 'style');
//     themeStyleElem.innerHTML = themeStyleString;

//     return themeStyleElem;
// }

// function rulesToString(rules: CSSRuleList | Array<CSSRule | {cssText: string}>) {
//     if (!Array.isArray(rules)) {
//         rules = [...rules];
//     }

//     return rules.reduce((cssString, rule) => {
//         return `${cssString} ${rule.cssText} \n`;
//     }, '');
// }

// async function getExternalRules(
//     dataService: DataService,
//     externalStyleSheet: CSSStyleSheet,
// ): Promise<Array<CSSRule | {cssText: string}> | undefined> {
//     let cssRules: CSSRuleList;

//     try {
//         cssRules = externalStyleSheet.cssRules;
//     } catch (err) {
//         let cssText: string | null = null;
//         try {
//             cssText = await dataService.resources.get<string>(externalStyleSheet.href, {
//                 responseType: 'text',
//             });
//         } catch (err) {
//             console.error(err);
//         }

//         if (!cssText) return;

//         const styleElem = document.createElement('style');

//         styleElem.innerHTML = cssText;

//         document.head.appendChild(styleElem);

//         const styleSheet = document.styleSheets[document.styleSheets.length - 1];

//         styleElem.remove();

//         if (!(styleSheet instanceof CSSStyleSheet)) return;

//         cssRules = styleSheet.cssRules;
//     }

//     const rules = await inlineExternalFonts(dataService, externalStyleSheet, cssRules);

//     return rules;
// }

// const appliedUnicodeRanges = [
//     latinUnicodeRange, // latin glyphs
//     latinUnicodeRangeSafari,
// ];

// async function inlineExternalFonts(
//     dataService: DataService,
//     parentStyleSheet: CSSStyleSheet,
//     cssRules: CSSRuleList,
// ): Promise<Array<CSSRule | {cssText: string}>> {
//     const fontRules: CSSFontFaceRule[] = [];
//     const otherRules: CSSRule[] = [];

//     [...cssRules].forEach((rule) => {
//         if (!(rule instanceof CSSFontFaceRule)) {
//             otherRules.push(rule);
//             return;
//         }

//         const {
//             style: {unicodeRange, fontWeight, fontStyle},
//         } = rule as CSSFontFaceRule & {style: {unicodeRange: string}};

//         if (
//             (!unicodeRange || appliedUnicodeRanges.includes(unicodeRange)) && // Safari stores unicode ranges in lower case.
//             (fontWeight === '400' || fontWeight === 'normal' || fontWeight === '300') &&
//             fontStyle === 'normal'
//         ) {
//             fontRules.push(rule);
//         } else {
//             otherRules.push(rule);
//         }
//     });

//     const inlinedFontRules = await Promise.all(
//         fontRules.map(rule => inlineFonts(dataService, parentStyleSheet, rule)),
//     );

//     return [...inlinedFontRules, ...otherRules];
// }


// async function inlineFonts(
//     dataService: DataService,
//     parentStyleSheet: CSSStyleSheet,
//     rule: CSSFontFaceRule,
// ): Promise<{cssText: string}> {
//     const urlObject = excractFontUrl(rule);

//     if (!urlObject) return rule;

//     const {url, format} = urlObject;

//     let dataUrl: string;

//     try {
//         let blob: Blob;
//         let urlString: string;

//         if (/^https?:\/\//.test(url)) {
//             urlString = url;
//         } else {
//             const parentPath = parentStyleSheet && parentStyleSheet.href;
//             const urlObject = new URL(parentPath ? resolveUrl(parentPath, url) : url);

//             urlString = urlObject.href;
//         }

//         blob = await dataService.resources.get<Blob>(urlString, {
//             responseType: 'blob',
//         });

//         if (!blob) return rule;

//         const reader = new FileReader();

//         reader.readAsDataURL(blob);

//         dataUrl = await new Promise((res) => {
//             reader.onload = function(e: ProgressEvent<FileReader> & {target: {result: string}}) {
//                 res(e.target.result);
//             };
//         });
//     } catch (err) {
//         console.error(err);

//         return rule;
//     }

//     const {
//         style: {
//             fontWeight,
//             fontStyle,
//             fontFamily,
//             unicodeRange,
//         },
//     } = rule as CSSFontFaceRule & {style: {unicodeRange: string}};

//     return {cssText: `
//         @font-face { 
//             font-family: ${fontFamily}; 
//             src: url(${dataUrl}) format('${format}');
//             ${fontWeight ? `font-weight: ${fontWeight};` : ''} 
//             ${fontStyle ? `font-weight: ${fontStyle};` : ''} 
//             ${unicodeRange ? `unicode-range: ${unicodeRange};` : ''} 
//         }
//     `};
// }

// function excractFontUrl(rule: CSSFontFaceRule): {url: string; format: string} | undefined {
//     const urls = rule.cssText.match(/url\("?'?([^'")]+)"?'?\)/g)
//         .map(urlString => urlString.match(/url\("?'?([^'")]+)"?'?\)/)[1]);
//     const formats = rule.cssText.match(/format\("?'?([^'")]+)"?'?\)/g)
//         .map(formatString => formatString.match(/format\("?'?([^'")]+)"?'?\)/)[1]);

//     const urlByFormat = formats.reduce((urlByFormat, format, index) => {
//         urlByFormat[format] = urls[index];

//         return urlByFormat;
//     }, {} as {[key: string]: string | undefined});

//     let format: string;

//     if (urlByFormat['woff2']) {
//         format = 'woff2';
//     } else if (urlByFormat['woff']) {
//         format = 'woff';
//     } else if (urlByFormat['truetype']) {
//         format = 'truetype';
//     } else {
//         format = formats[0];
//     }

//     return format && {
//         format,
//         url: urlByFormat[format],
//     };
// }
export {}