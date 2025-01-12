export interface TableDataProps {
    data: {
        filename: string,
        uploadedat: string,
        size: number,
        sharing?: boolean
        id?: number
        uuid?: string
    }[]
}

export interface TableHeaderProps {
    headers: string[]
}

export interface TableRowProps {
    rowData: (
        string | React.ReactNode
    )[],
    rowIndex: number,
    updateParentSharing?: (newSharing: boolean) => void
}