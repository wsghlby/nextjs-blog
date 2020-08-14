// import '../styles/common.global.scss'
import 'antd/dist/antd.css'


import React from 'react';
import { wrapper } from '../redux';
import Footer from "@/components/Footer";
import { getArticleListOnce } from '@/actions/article';
import { getFolderList } from "@/actions/folder-list";


const AppWrapper = ({ children }) => {
    return (
        <div className='layout'>
            {children}
            <Footer />
        </div>
    )
};

const MyApp = ({Component, pageProps}) => {
    return (
        // <Provider store={store}>
            <AppWrapper >
                <Component {...pageProps} />
            </AppWrapper>
        // </Provider>
    )
};

MyApp.getInitialProps = async ({Component, ctx}) => {

    // console.log('getInitialProps');

    const res = await Promise.all([
        ctx.store.dispatch(getFolderList()),
        ctx.store.dispatch(getArticleListOnce()),
        // ctx.store.dispatch(getCurrUser()),
    ]);


    // const res = await ctx.store.dispatch(getArticleListOnce());

    // const res = await ctx.store.dispatch(getFolderList());
    //     .then(() => {
    //     ctx.store.dispatch(getArticleListOnce()).then(() => {
    //         ctx.store.dispatch(getCurrUser())
    //     })
    // } );

    return res;

    // return {
    //     pageProps: {
    //         // Call page-level getInitialProps
    //         ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    //         // Some custom thing for all pages
    //         pathname: ctx.pathname,
    //     },
    // };

};


// MyApp.getInitialProps = async ({ctx}) => {
//     // const res = await fetch('https://api.github.com/repos/vercel/next.js')
//     // const json = await res.json()
//     // return { stars: json.stargazers_count }
//     // const { store } = ctx;
//     console.log('getInitialProps');
//     const promise = new Promise((resolve) => {
//         console.log('promise');
//         ctx.store.dispatch(getFolderList()).then(() => {
//             ctx.store.dispatch(getArticleListOnce()).then(() => {
//                 ctx.store.dispatch(getCurrUser()).then(() => {
//                     resolve();
//                 });
//             })
//         } );
//     });
//     // store.dispatch(getFolderList()).then(() => {
//     //     store.dispatch(getArticleListOnce()).then(() => {
//     //         store.dispatch(getCurrUser()).then(() => {
//     //         });
//     //     })
//     // } );
//     return await promise;
// };

export default wrapper.withRedux(MyApp);


//
// const onBeforeLift = () => {
//     // take some action before the gate lifts
// }
//
//
// const MyApp = ({Component, pageProps}) => {
//     // return{persistor.subscribe( () => (
//     //             <AppWrapper>
//     //                 <Component {...pageProps} />
//     //             </AppWrapper>
//     //     )
//     // )}
//
//     return(
//     <PersistGate loading={message.warning('Please waiting')} onBeforeLift={onBeforeLift} persistor={ persistor }>
//         <AppWrapper>
//             <Component {...pageProps} />
//         </AppWrapper>
//     </PersistGate>
//     );
// };


