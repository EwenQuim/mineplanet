import React from "react"
import Board from "../Board"
import { Text, View } from '../components/Themed';
import { Cell } from "../types"
import CellView from "../components/CellView"

export default function StatsScreen({ board }: { board: Board }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>

            <CellView
                cell={new Cell(0, 0)}
                pressAction={() => { }}
                longPressAction={() => { }} />

            <Text style={{ fontSize: 16, marginLeft: 5 }}>
                {board.height * board.width - board.cellsRevealed - board?.bombsTotal} left
                - {board?.flagsSet ?? 0} 🚩
                / {board?.bombsTotal ?? 0} 💣
            </Text>

        </View>
    )
}
