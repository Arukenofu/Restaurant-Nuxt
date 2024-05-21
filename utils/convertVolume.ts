export default function(volume: number, isWater?: boolean):string {
    let unit:string[] = [' г', ' кг']
    if (isWater) unit = [' мл', ' л']

    if (volume < 1000) {
        return volume + unit[0]
    }
    return (volume / 1000) + unit[1]
}
