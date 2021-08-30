import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from 'vuetify/lib/util/colors'

export default {
    primary: {
        base: colors.pink.base,
        darken1: colors.purple.darken2,
    },
    secondary: colors.indigo,
    // 所有的键将生成主题样式,
    // 这里我们添加一个自定义的 `tertiary` 颜色
    tertiary: colors.pink.base,
}