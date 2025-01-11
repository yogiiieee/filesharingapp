export interface TableDataProps {
    data: {
        filename: string,
        uploadedat: string,
        size: number,
        sharing?: boolean
    }[]
}

export interface TableHeaderProps {
    headers: string[]
}

export interface TableRowProps {
    rowData: (
        string | React.ReactNode
    )[],
    rowIndex: number
}