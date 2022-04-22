import {useCallback, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {useNavigate} from "react-router-dom";

export default function VolcanoesList(props) {
    const gridRef = useRef();
    const navigate = useNavigate();
    const countryLists = props.countryLists;
    const [columnDefs] = useState([
        {headerName: "Name", field: 'name', sortable: true, minWidth: 100},
        {headerName: "Region", field: 'region', sortable: true, filter: true, minWidth: 50},
        {headerName: "Subregion", field: 'subregion', sortable: true, filter: true, minWidth: 100},]);
    const onGridSizeChanged = useCallback(() => {
        // get the current grids width
        var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
        // keep track of which columns to hide/show
        var columnsToShow = [];
        var columnsToHide = [];
        // iterate over all columns (visible or not) and work out
        // now many columns can fit (based on their minWidth)
        var totalColsWidth = 0;
        var allColumns = gridRef.current.columnApi.getAllColumns();
        if (allColumns && allColumns.length > 0) {
            for (var i = 0; i < allColumns.length; i++) {
                var column = allColumns[i];
                totalColsWidth += column.getMinWidth() || 0;
                if (totalColsWidth > gridWidth) {
                    columnsToHide.push(column.getColId());
                } else {
                    columnsToShow.push(column.getColId());
                }
            }
        }
        // show/hide columns based on current grid width
        gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
        gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
        // fill out any available space to ensure there are no gaps
        gridRef.current.api.sizeColumnsToFit();
    }, []);
    return (

        <div className="ag-theme-alpine justify-content-center pt-4" id="grid-wrapper"
             style={{width: '100%', height: '100%'}}>
            <AgGridReact
                ref={gridRef}
                rowData={countryLists}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                onGridSizeChanged={onGridSizeChanged}
                paginationAutoPageSize={true}
                onRowClicked={(row) => navigate(`/volcano/${row.data.id}`)}>
            </AgGridReact>
        </div>
    )
}