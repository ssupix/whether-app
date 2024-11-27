import { createTheme } from '@rneui/themed';


export const theme = createTheme ({
    // colors
    colors: {
        grey: '#BDB6AD',
        blue: '#4464A9',
        orange: '#C85934',
        yellow: '#C88F34',
        lightGrey: '#F5F1F0',
        darkGrey: '#2E2E2E',
    },
    // components
    components: {
        Text: {
            h1Style: {
                fontSize: 96,
                fontFamily: 'RethinkSans_Normal',
                textTransform: 'lowercase',
                fontWeight: 'regular',
                letterSpacing: -2.5,
            },
            h2Style: {
                fontSize: 32,
                fontFamily: 'RethinkSans_Normal'
            },
            h3Style: {
                fontSize: 20,
                fontFamily: 'RethinkSans_Normal'
            },
            h4Style: {
                fontSize: 13,
                fontFamily: 'RethinkSans_Normal'
            },
            bodyStyle: {
                fontSize: 20,
                fontFamily: 'RethinkSans_Normal'
            },
        },
    },
});