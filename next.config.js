// next.config.js
const withImages = require('next-images');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
module.exports = withImages(withSass(withCSS()));

// module.exports = withImages(withCSS(withSass({
//
// })));
//
// module.exports = withImages(withCSS(withSass({
//     cssModules: true,
//     cssLoaderOptions: {
//         importLoaders: 2,
//         localIdentName: '[local]___[hash:base64:5]',
//     },
//
//     webpack: config => {
//         config.module.rules.forEach(rule => {
//             if (rule.test && rule.test.toString().includes('.scss')) {
//                 rule.rules = rule.use.map(useRule => {
//                     if (typeof useRule === 'string') {
//                         return { loader: useRule };
//                     }
//
//                     if (useRule.loader.startsWith('css-loader')) {
//                         return {
//                             oneOf: [
//                                 {
//                                     test: new RegExp('.common.global.scss$'),
//                                     loader: useRule.loader,
//                                     options: { ...useRule.options, modules: false },
//                                 },
//                                 {
//                                     loader: useRule.loader,
//                                     options: useRule.options,
//                                 },
//                             ],
//                         };
//                     }
//                     return useRule;
//                 });
//                 delete rule.use;
//             }
//         });
//         return config;
//     },
// }))
// );
