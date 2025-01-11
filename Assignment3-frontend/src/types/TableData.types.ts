export interface TableDataProps {
    data: {
        name: string,
        date: string,
        size: number,
        actions: 'download' | 'delete'
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