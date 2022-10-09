import React, { useEffect, useState } from 'react'
import Table from '../../components/Table'
import { filter } from '../../types/filter'
import { data } from '../../utils/data'
import { dataType } from '../../types/dataType'

const TablePage = () => {
    const [sortedByState, setSortedByState] = useState<string>('')

    const [filterState, setFilterState] = useState<filter>({
        type: '',
        status: '',
    })

    const [tableData, setTableData] = useState<dataType[]>(data)

    const onSort = (sort: string) => {
        setSortedByState((prevState) => {
            return prevState == sort ? '-' + sort : sort
        })

        switch (sortedByState) {
            case 'volume':
                setTableData(tableData.sort((x, y) => x.volume - y.volume))
                break
            case '-volume':
                setTableData(tableData.sort((x, y) => y.volume - x.volume))
                break
            case 'project':
                setTableData(
                    tableData.sort((x, y) => {
                        const colorOrder = ['green', 'yellow', 'red']
                        return (
                            colorOrder.indexOf(x.status) -
                            colorOrder.indexOf(y.status)
                        )
                    })
                )
                break
            case '-project':
                setTableData(
                    tableData.sort((x, y) => {
                        const colorOrder = ['green', 'yellow', 'red']
                        return (
                            colorOrder.indexOf(y.status) -
                            colorOrder.indexOf(x.status)
                        )
                    })
                )
                break
        }
    }

    const onFilter = (filter: filter) => {
        if (filter.status === '' && filter.type === '') {
            setTableData(data)
        } else if (filter.status === '' && !(filter.type === '')) {
            setTableData(data.filter((item) => item.type === filter.type))
        } else if (!(filter.status === '') && filter.type === '') {
            setTableData(data.filter((item) => item.status === filter.status))
        } else {
            setTableData(
                data.filter(
                    (item) =>
                        item.status === filter.status &&
                        item.type === filter.type
                )
            )
        }
        setFilterState(filter)
    }

    const onBuy = (id: number) => {
        alert('You bought: ' + id + ' item')
    }

    return (
        <Table
            data={tableData}
            sortedBy={sortedByState}
            filters={filterState}
            onSort={onSort}
            onFilter={onFilter}
            onBuy={onBuy}
        />
    )
}

export default TablePage
