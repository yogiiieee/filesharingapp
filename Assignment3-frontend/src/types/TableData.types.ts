export interface TableDataProps {
    data: {
        name: string,
        date: string,
        size: number,
        actions: 'download' | 'sharing' | 'both'
        sharing?: boolean
    }[]
}

export interface TableHeaderProps {
    headers: string[]
}

export interface TableRowProps {
    rowData: (
        string | React.ReactNode
    )[]
}