import { View, Text } from "react-native";
import { infopers } from "../styles";

function CardRow(props) {
    return (
        <View style={infopers.cardInfoRowContainer}>
            <View style={infopers.cardInfoRowTitleContainer}>
                <Text numberOfLines={1} style={infopers.cardInfoRowTitleText}>
                    {props.title}
                </Text>
            </View>
            <View style={infopers.cardInfoRowDataContainer}>
                <Text style={infopers.cardInfoRowDataText}>{props.data}</Text>
            </View>
        </View>
    );
}

export default CardRow;