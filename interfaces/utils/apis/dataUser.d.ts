interface IApiComponentProps extends IBaseCompProps {
    name: string;
    poster_path: string;
}

interface IApiComponent<P = {}> extends IBaseComp<P> {}
