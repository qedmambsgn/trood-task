import React from 'react'
import { dataType } from '../../types/dataType'
import './index.scss'
import { filter } from '../../types/filter'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'

interface ITableProps {
    data: dataType[]
    sortedBy: string
    filters: filter
    onSort: (sort: string) => void
    onFilter: (filter: filter) => void
    onBuy: (id: number) => void
}
const enum FIELD_TYPE {
    TYPE = 'type',
    STATUS = 'status',
}

const Table = ({
    data,
    sortedBy,
    filters,
    onSort,
    onFilter,
    onBuy,
}: ITableProps) => {
    const handleFilter = (fieldData: string, field: FIELD_TYPE) => {
        switch (field) {
            case FIELD_TYPE.STATUS:
                onFilter({ type: filters.type, status: fieldData })
                break
            case FIELD_TYPE.TYPE:
                onFilter({ type: fieldData, status: filters.status })
                break
        }
    }
    return (
        <div className={'table'}>
            {data ? (
                <table>
                    <thead>
                        <tr>
                            <th className={'headerNameCell'}>
                                <div className={'arrow'}>
                                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                </div>
                                <select
                                    className={'customSelect'}
                                    onChange={(event) =>
                                        handleFilter(
                                            event.target.value,
                                            FIELD_TYPE.STATUS
                                        )
                                    }
                                >
                                    <option value={''}>All</option>
                                    <option value={'green'}>Green</option>
                                    <option value={'yellow'}>Yellow</option>
                                    <option value={'red'}>Red</option>
                                </select>
                                <span onClick={() => onSort('project')}>
                                    Project
                                    <div className={'sortArrow'}>
                                        <span className={'sortArrowUp'}>
                                            <ArrowDropUpIcon />
                                        </span>
                                        <span className={'sortArrowDown '}>
                                            <ArrowDropDownIcon />
                                        </span>
                                    </div>
                                </span>
                            </th>
                            <th>
                                <div className={'headerTokenCell'}>
                                    <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                                    <select
                                        className={'customSelect'}
                                        onChange={(event) =>
                                            handleFilter(
                                                event.target.value,
                                                FIELD_TYPE.TYPE
                                            )
                                        }
                                    >
                                        <option value={''}>All</option>
                                        <option value={'TRST'}>TRST</option>
                                        <option value={'THT'}>THT</option>
                                        <option value={'THC'}>THC</option>
                                    </select>
                                    Token
                                </div>
                            </th>
                            <th>Conditions</th>
                            <th>
                                <span
                                    className={'volumeSpan'}
                                    onClick={() => onSort('volume')}
                                >
                                    Volume
                                    <div className={'sortArrow'}>
                                        <span className={'sortArrowUpVolume'}>
                                            <ArrowDropUpIcon />
                                        </span>
                                        <span className={'sortArrowDown '}>
                                            <ArrowDropDownIcon />
                                        </span>
                                    </div>
                                </span>
                            </th>
                            <th>ROI</th>
                            <th>Free float</th>
                            <th>Insurance hedge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr
                                className={`tableRow-${item.status}`}
                                key={item.id}
                            >
                                <td className={'nameCell'}>
                                    <div
                                        className={`ball-${item.status}`}
                                    ></div>
                                    <p>{item.name}</p>
                                </td>
                                <td>{item.type}</td>
                                <td>{item.conditions}</td>
                                <td>$ {item.volume}</td>
                                <td>{item.roi} %</td>
                                <td>{item.free}</td>
                                <td>{item.hedge} %</td>
                                <td className={`flexButton`}>
                                    <button onClick={() => onBuy(item.id)}>
                                        Buy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>Data not founded</div>
            )}
        </div>
    )
}

export default Table
