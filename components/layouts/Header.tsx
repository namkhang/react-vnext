import Head from 'next/head';

const Header: IHeaderComponent<IHeaderComponentProps> = () => {
    return (
        <>
            <Head>
                <title>Training Web</title>
                <link rel="icon" type="image/png" href="/favicon.ico" />
            </Head>
            <div>Header</div>
        </>
    );
};

export default Header;
