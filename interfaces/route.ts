export interface route {
    name: string,
    route: string,
    func?: () => Promise<void>
}