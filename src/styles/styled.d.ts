import 'styled-components'

declare module 'styled-components'{
    export interface DefaultTheme{
        textColor: string;
        alertColor: string;
        hoverColor: string;
        highlightColor: string;
        BgColor_base: string;
        BgColor_bold : string;
        BgColor_sub: string;
        BgColor_dim : string;
        borderColor: string;
    }
}