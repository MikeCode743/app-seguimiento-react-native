import React from 'react'
import { useState } from 'react';
import { Icon, Tooltip } from '@rneui/base';
import { FlatList, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const TooltipComponent = ({ icon, tooltip, text, visible = false }) => {


    const [tooltipInfo, setTooltipInfo] = useState(visible);

    return (
        <>

            <Icon
                name={icon.name}
                type={icon.type}
                color={icon.color}
                size={icon.size}
                onPress={() => {
                    setTooltipInfo(true);
                }}
                style={{
                    ...icon.style,
                    marginHorizontal: 5,
                }}

            />
            <Tooltip
                visible={tooltipInfo}
                withPointer={false}
                onOpen={() => {
                    setTooltipInfo(true);
                }}
                onClose={() => {
                    setTooltipInfo(false);
                }}
                height={tooltip.height}
                width={tooltip.width}
                backgroundColor={tooltip.color}
                popover={
                    <FlatList
                        data={text}
                        renderItem={({ item }) => <Text style={{
                            fontSize: 15,
                            alignContent: 'center',
                            color: tooltip.colorText,
                        }}>
                            {item.key}
                        </Text>}
                    />
                }
            >
            </Tooltip>

        </>
    )
}
