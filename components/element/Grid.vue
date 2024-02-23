<template>
  <div style="width: 100%">
    <el-table
      :id="gridId"
      ref="theGrid"
      :data="gridData"
      :show-header="option?.hasOwnProperty('showHeader') ? option.showHeader : true"
      :border="option?.hasOwnProperty('border') ? option.border : true"
      :stripe="option?.hasOwnProperty('stripe') ? option.stripe : false"
      :highlight-current-row="option?.hasOwnProperty('highlight') ? option.highlight : false"
      :empty-text="option?.hasOwnProperty('emptyText') ? option.emptyText : ' '"
      :header-cell-style="{ textAlign: 'center' }"
      :max-height="option?.maxHeight"
      :height="option?.height"
      :row-key="option?.treeKey"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :span-method="spanMethod"
      :row-class-name="rowClassName"
      style="width: 100%"
      @selection-change="selectChange"
      @select-all="selectAll"
      @cell-click="cellClick"
      @row-click="rowClick"
      @row-dblclick="rowDblClick"
      @sort-change="sortChange"
    >
      <el-table-column
        v-for="column in gridHeader"
        :key="column.label"
        :prop="column.prop"
        v-bind="column"
      >
        <template v-if="column.inline?.type === 'input'" #default="scope">
          <el-input v-model="scope.row[column.prop]" style="width: calc(100% - 8px);" />
        </template>
        <template v-else-if="column.inline?.type === 'date-picker'" #default="scope">
          <el-date-picker
            v-model="scope.row[column.prop]"
            v-bind="column.inline.option"
            style="width: calc(100% - 8px);"
          />
        </template>
        <template v-else-if="column.inline?.type === 'switch'" #default="scope">
          <el-switch
            v-model="scope.row[column.prop]"
            active-value="Y"
            inactive-value="N"
            @change="column.inline.changeFn(scope.row)"
          />
        </template>
        <template v-else-if="column.inline?.type === 'tag'" #default="scope">
          <el-tag
            v-bind="column.inline.option"
            :type="column.inline.tagTypeFn(column.prop, scope.row)"
          >
            {{ scope.row[column.prop] }}
          </el-tag>
        </template>
        <template v-else-if="column.inline?.type === 'select' && column.inline.items" #default="scope">
          <el-select
            v-model="scope.row[column.prop]"
            style="width: 100%;"
            @change="column.inline.changeFn(scope.row)"
          >
            <el-option
              v-for="item in scope.row[column.inline.items]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div
            v-if="(scope.row[column.inline.items] === null || scope.row[column.inline.items].length === 0) && column.inline?.emptyText"
            class="cell"
          >
            {{ column.inline.emptyText }}
          </div>
        </template>
        <template v-else-if="column.oper" #default="scope">
          <el-button
            v-for="(o, key) in column.oper"
            :key="key"
            v-bind="o.option"
            variant="outline-default"
            @click="o.clickFn(scope.row, $event)"
          >
            {{ o.name }}
          </el-button>
        </template>

        <!-- 2Depth -->
        <template v-if="column.subDepth">
          <el-table-column
            v-for="subDepth in column.subDepth"
            :key="subDepth.label"
            :prop="subDepth.prop"
            v-bind="subDepth"
          >
            <!-- 3Depth -->
            <template v-if="subDepth.subDepth">
              <el-table-column
                v-for="ssubDepth in subDepth.subDepth"
                :key="ssubDepth.label"
                :prop="ssubDepth.prop"
                v-bind="ssubDepth"
              >
                <!-- 4Depth -->
                <template v-if="ssubDepth.subDepth">
                  <el-table-column
                    v-for="sssubDepth in ssubDepth.subDepth"
                    :key="sssubDepth.label"
                    :prop="sssubDepth.prop"
                    v-bind="sssubDepth"
                  />
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
const theGrid = ref()

const props = defineProps({
  gridId: { type: String, default: 'theGrid' },
  url: { type: String, default: '' },
  param: { type: Object, default: () => {} },
  gridData: { type: Array, required: true },
  gridHeader: { type: Array, required: true },
  option: { type: Object, default: () => {} },
  spanMethodFunc: { type: Function, default: () => {} },
  rowClassNmFunc: { type: Function, default: () => {} },
  cellClickFunc: { type: Function, default: () => {} },
  rowClickFunc: { type: Function, default: () => {} },
  rowDbClickFunc: { type: Function, default: () => {} },
  selectChangeFunc: { type: Function, default: () => {} },
  sortFunc: { type: Function, default: () => {} }
})

const { spanMethodFunc, rowClassNmFunc, cellClickFunc, rowClickFunc, rowDbClickFunc, selectChangeFunc, sortFunc } = props

function isPassEvent (rowCol, headerCol) { // 그리드 행 클릭 이벤트 패스 처리 여부
  if (typeof rowCol === 'undefined') { // 그리드 로딩후 첫번째행 자동 클릭 처리시
    return false
  }

  if (typeof rowCol.property === 'undefined') { // 체크박스, button의 경우
    return true
  }

  if (rowCol.property === headerCol.prop && headerCol.inline?.type) {
    if (['input', 'switch'].includes(headerCol.inline.type)) { // input, swich 폼의 경우
      return true
    }
  }

  return false
}

function spanMethod ({ row, column, rowIndex, columnIndex }) {
  if (spanMethodFunc !== null) {
    spanMethodFunc(row, column, rowIndex, columnIndex)
  }
}

function rowClassName ({ row, rowIndex }) {
  if (rowClassNmFunc !== null) {
    rowClassNmFunc(row, rowIndex)
  }
}

function rowClick (row, column, event) {
  // 이벤트 패스 처리 여부
  const passEvent = props.gridHeader.some(header => isPassEvent(column, header, event))

  if (rowClickFunc !== null && !passEvent) {
    rowClickFunc(row, column, event)
  }
}

function rowDblClick (row, column, event) {
  if (rowDbClickFunc !== null) {
    rowDbClickFunc(row, column, event)
  }
}

function cellClick (row, column, cell, event) {
  if (cellClickFunc !== null) {
    cellClickFunc(row, column, cell, event)
  }
}

/**
 * 체크박스 활성화 시 사용, 체크한 row 반환
 * @param {Array} selection 선택 row
 */
function selectChange (selection) {
  if (selectChangeFunc !== null) {
    selectChangeFunc(selection)
  }
}

function selectAll () {
}

function sortChange ({ prop, order }) {
  if (sortFunc !== null) {
    sortFunc(prop, order)
  }
}

function getCheckedList () {
  return theGrid.value.getSelectionRows()
}

function getTableData () {
  return props.gridData
}

// 참조 메소드 내보내기
defineExpose({ getCheckedList, getTableData })

</script>
