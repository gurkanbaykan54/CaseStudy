import React from 'react';
import { IconType } from '../../common/enum';
import { FontAwesome } from "@react-native-vector-icons/fontawesome";
import { EvilIcons } from "@react-native-vector-icons/evil-icons";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { AntDesign } from "@react-native-vector-icons/ant-design";
import { Entypo } from "@react-native-vector-icons/entypo";
import { Feather } from "@react-native-vector-icons/feather";
import { Foundation } from "@react-native-vector-icons/foundation";
import { SimpleLineIcons } from "@react-native-vector-icons/simple-line-icons";
import { Octicons } from "@react-native-vector-icons/octicons";
import { Zocial } from "@react-native-vector-icons/zocial";
import { Fontisto } from "@react-native-vector-icons/fontisto";

export interface IconProps {
    type: IconType;
    name: string;
    color?: string;
    size?: number;
    style?: any;
    onPress?: () => void;
}

const Icon: React.FC<IconProps> = ({
    type,
    name,
    color = '#000',
    size = 24,
    style,
    onPress
}) => {
    const iconProps = {
        name,
        size,
        color,
        style,
        onPress
    };

    switch (type) {
        case IconType.FONTAWESOME:
            return <FontAwesome {...iconProps} />;

        case IconType.FONTAWESOME5:
            return <FontAwesome5 {...iconProps} />;

        case IconType.FONTAWESOME6:
            return <FontAwesome6 {...iconProps} />;

        case IconType.MATERIAL:
            return <MaterialIcons {...iconProps} />;

        case IconType.IONIC:
            return <Ionicons {...iconProps} />;

        case IconType.ANT_DESIGN:
            return <AntDesign {...iconProps} />;

        case IconType.ENTYPO:
            return <Entypo {...iconProps} />;

        case IconType.EVIL_ICONS:
            return <EvilIcons {...iconProps} />;

        case IconType.FEATHER:
            return <Feather {...iconProps} />;

        case IconType.FOUNDATION:
            return <Foundation {...iconProps} />;

        case IconType.SIMPLE_LINE_ICONS:
            return <SimpleLineIcons {...iconProps} />;

        case IconType.OCTICONS:
            return <Octicons {...iconProps} />;

        case IconType.ZOCIAL:
            return <Zocial {...iconProps} />;

        case IconType.FONTISTO:
            return <Fontisto {...iconProps} />;

        case IconType.MATERIAL_DESIGN:
            return <MaterialDesignIcons {...iconProps} />;

        default:
            return <FontAwesome {...iconProps} />;
    }
};

export default Icon;