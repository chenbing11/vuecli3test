<template>
  <div>
    <div v-if="iconType">
      <div class="table_style">
        <div>
          <span class="span_title">主险</span>
          <Tooltip content="展开" placement="top">
            <span @click="mainRisk=!mainRisk">
              <Icon :type="mainRisk?'ios-arrow-down':'ios-arrow-forward'" />
            </span>
          </Tooltip>
        </div>
        <div v-if="mainRisk" style="margin-top:10px;">
          <Table :columns="costTitle" ref="currentRowTable" :data="zxlist" :loading="tableloading" @on-row-click="selectxz">
            <!-- <template slot="checkbox" slot-scope="{row,index}">
              <div @click="selectData" class="checkbox12">
                      <Checkbox v-checked="zxlist[index].checkbox" :checked=selectCheckbox></Checkbox>
              </div>
            </template> -->
            <template slot="insKindName" slot-scope="{index }" v-if="zxlist[index].insKindClassify=='1'">
              <div v-if="zxlist[index].insKindName=='车上人员责任险（乘客）'">
                {{zxlist[index].insKindName}} 每人保额
               <Input
                  type="text"
                  v-model="zxlist[index].carInsuredAmt"
                  class="small_style"
                  name='carInsuredAmt'
                  clearable
                  style="width:20%;"
                /> 座位数/个
              <Input
                  type="text"
                  v-model="zxlist[index].carSeatNum"
                  class="small_style"
                  name='carSeatNum'
                  clearable
                  style="width:10%; "
                />
              </div>
              <div v-else>{{zxlist[index].insKindName}}</div>
              <!-- <Input type="text" v-model="cxxzList[index].insKindName" clearable name="insKindName" placeholder="" class="small_style" ></Input> -->
            </template>
            <template
              slot="insuredAmt"
              slot-scope="{index }"
              v-if="zxlist[index].insKindClassify=='1'"
            >
             <Select v-if="zxlist[index].insKindName=='商业第三者责任保险'"
                v-model="zxlist[index].insuredAmt"
                placeholder="请选择保额"
                name="belongLtd"
                clearable
                :disabled="check"
                class="small_style"
              >
                <Option
                  v-for="item in insuredAmtList"
                  :value="item.name"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
              <Input v-else
                type="text"
                v-model="zxlist[index].insuredAmt"
                clearable
                :name="'cxxzList' +index+ '.insuredAmt'"
                placeholder="请输入保额"
                class="small_style"
                :disabled="check"
              ></Input>

            </template>
            <template
              slot="premium"
              slot-scope="{index }"
              v-if="zxlist[index].insKindClassify=='1'"
            >
              <Input
                type="text"
                v-model="zxlist[index].premium"
                clearable
                :name="'cxxzList' +index+ '.premium'"
                placeholder="请输入保费"
                class="small_style"
                :disabled="check"
              ></Input>
            </template>
          </Table>
        </div>
      </div>
      <!-- <div class="table_style">
        <div class="table-title">
          <span class="span_title">常用附加险</span>
          <Tooltip content="展开" placement="top">
            <span @click="cyrisk=!cyrisk">
              <Icon :type="cyrisk?'ios-arrow-down':'ios-arrow-forward'" />
            </span>
          </Tooltip>
        </div>
        <div v-if="cyrisk" style="margin-top:10px;">
          <Table :columns="costTitle" ref="currentRowTable" :loading="tableloading" :data="cyfjxlist" @on-selection-change="selectcy">
            <template slot="insKindName" slot-scope="{row,index }">
              <div v-if="cyfjxlist[index].insKindName=='指定修理厂险'">
                {{cyfjxlist[index].insKindName}}
                <div>
                 类型
                  <Input
                  type="text"
                  v-model="cyfjxlist[index].repairShopInsType"
                  class="small_style"
                  name='repairShopInsType'
                  clearable
                  style="width:15%;"
                 /> 费率
                 <Input
                  type="text"
                  v-model="cyfjxlist[index].repairShopInsRate"
                  class="small_style"
                  name='repairShopInsRate'
                  clearable
                  style="width:10%; "
                 /> %
               </div>
              </div>
              <div v-else-if="cyfjxlist[index].insKindName=='玻璃单独破碎险'">{{cyfjxlist[index].insKindName}}
                玻璃类型
                <div style="display:inline-block;width:20%;">
                    <Select v-model="cyfjxlist[index].glassType"
                           placeholder="请选择保额"
                           name="glassType"
                           clearable
                           :disabled="check"
                            class="small_style"
                       >
                      <Option
                        v-for="item in glassTypeLIst"
                        :value="item.dictCode"
                        :key="item.dictCode"
                      >{{ item.dictValue }}</Option>
                    </Select>
                </div>
              </div>
              <div v-else>{{cyfjxlist[index].insKindName}}</div>
             </template>
            <template
              slot="insuredAmt"
              slot-scope="{row,index }"
            >
              <Input v-if="index==1||index==3||index==4"
                type="text"
                v-model="cyfjxlist[index].insuredAmt"
                clearable
                :name="'cyfjxlist' +index+ '.insuredAmt'"
                placeholder="请输入保额"
                class="small_style"
                :disabled="check"
              ></Input>
              <div v-else></div>
            </template>
            <template
              slot="premium"
              slot-scope="{index }"
            >
              <Input
                type="text"
                v-model="cyfjxlist[index].premium"
                clearable
                :name="'cyfjxlist' +index+ '.premium'"
                placeholder="请输入保费"
                class="small_style"
                :disabled="check"
              ></Input>
            </template>
          </Table>
        </div>
      </div>
      <div class="table_style">
         <div class="table-title">
          <span class="span_title">不常用附加险</span>
          <Tooltip content="展开" placement="top">
            <span @click="bcyrisk=!bcyrisk">
              <Icon :type="bcyrisk?'ios-arrow-down':'ios-arrow-forward'" />
            </span>
          </Tooltip>
        </div>
        <div v-if="bcyrisk" style="margin-top:10px;">
          <Table :columns="costTitle" ref="currentRowTable" :loading="tableloading" :data="bcyfjxlist" @on-selection-change="selectbcy">
            <template slot="insKindName" slot-scope="{row,index }">
              <div v-if="bcyfjxlist[index].insKindName=='修理期间费用补偿险'">
                {{bcyfjxlist[index].insKindName}}
                  日赔偿金额
                  <Input
                  type="text"
                  v-model="bcyfjxlist[index].dayIndemnityAmt"
                  class="small_style"
                  name='dayIndemnityAmt'
                  clearable
                  style="width:15%;"
                 />  天数
                 <Input
                  type="text"
                  v-model="bcyfjxlist[index].days"
                  class="small_style"
                  name='days'
                  clearable
                  style="width:10%; "
                 />
               </div>
              <div v-else>{{bcyfjxlist[index].insKindName}}</div>
             </template>
            <template
              slot="insuredAmt"
              slot-scope="{row,index }"
            >
              <Input v-if="index==0||index==1||index==3"
                type="text"
                v-model="bcyfjxlist[index].insuredAmt"
                clearable
                :name="'bcyfjxlist' +index+ '.insuredAmt'"
                placeholder="请输入保额"
                class="small_style"
                :disabled="check"
              ></Input>
              <div v-else></div>
            </template>
            <template
              slot="premium"
              slot-scope="{index }"
            >
              <Input
                type="text"
                v-model="bcyfjxlist[index].premium"
                clearable
                :name="'bcyfjxlist' +index+ '.premium'"
                placeholder="请输入保费"
                class="small_style"
                :disabled="check"
              ></Input>
            </template>
          </Table>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "cxxzinfo",
  data() {
    return {
      zxlist: [],
      cyfjxlist: [],
      bcyfjxlist: [],
      zxinfolist:[],
      cyfjxinfolist:[],
      bcyfjxinfolist:[],
      selectcxxzlist:[],
      baseinfo: {},
      mainRisk: true,
      iconType: true,
      bcyrisk:true,
      cyrisk:true,
      tableloading:true,
      cxxzList:[
        {
          "insKindCode":"Car001", //String  险种编码
          "insuredAmt":"10000", //Number  保额
          "premium":"100", //Number 保费
          "insKindName":'车上人员责任险（乘客）',
          "insKindClassify":1
        },
        {
          "insKindCode":"Car002", //String  险种编码
          "insuredAmt":100.05, //Number  保额
          "premium":50, //Number 保费
          "insKindName":'指定修理厂险',
          "insKindClassify":2
        },
        {
          "insKindCode":"Car003", //String  险种编码
          "insuredAmt":100.05, //Number  保额
          "premium":50, //Number 保费
          "insKindName":'指定修理厂险',
          "insKindClassify":3
        },
            {
            "insKindCode":"Car004", //String  险种编码
            "insuredAmt":"", //Number  保额
            "premium":"", //Number 保费
            "insKindName":'交强险',
            "insKindClassify":1 },
              {
              "insKindCode":"Car005", //String  险种编码
              "insuredAmt":100.05, //Number  保额
              "premium":50, //Number 保费
              "insKindName":'常用附加险',
              "insKindClassify":2 },
              {
              "insKindCode":"Car006", //String  险种编码
              "insuredAmt":100.05, //Number  保额
              "premium":50, //Number 保费
              "insKindName":'不常用附加险',
              "insKindClassify":3 },
              ],
      insuredAmtList: [
            {
              value: 0,
              name: "50,000.00"
            },
            {
              value: 1,
              name: "100,000.00"
            },
             {
              value: 2,
              name: "150,000.00"
            },
             {
              value: 3,
              name: "200,000.00"
            },
             {
              value: 4,
              name: "300,000.00"
            },
             {
              value: 5,
              name: "500,000.00"
            },
             {
              value: 6,
              name: "1,000,000.00"
            },
             {
              value: 7,
              name: "1,500,000.00"
            },
             {
              value: 8,
              name: "2,000,000.00"
            },
             {
              value: 9,
              name: "3,000,000.00"
            },
             {
              value: 10,
              name: "5,000,000.00"
            },
          ],
      // columns4: [
      //     {
      //         type: 'selection',
      //         width: 60,
      //         align: 'center'
      //     },
      //     {
      //         title: '险种名称',
      //         key: 'insKindName'
      //     },
      //     {
      //         title: '保额',
      //         key: 'insuredAmt'
      //     },
      //     {
      //         title: '保费',
      //         key: 'premium'
      //     }
      // ],
      costTitle: [
        {

          width: 60,
          align: "center",
          key: "checkbox",
          render: (h, params) => {
            return h("div",[
              h('Checkbox', {
                 props: {
                     value: params.row.checkbox
                 },
                 on:{
                   'on-change':(status)=>{
                     console.log(params,status);
                     this.zxlist[params.index].checkbox= status;
                   }
                 }
              }),
            ],{
              class:'selscrt',
              style:{
                    color:"red"
                  }
            })
          }
        },
        {
          key: "insKindName",
          renderHeader: h => {
            return h("div", [
              h("span", "险种名称"),
              h("span", {
                style: {
                  color: "red",
                  fontSize: "17px",
                  position: "relative",
                  top: "5px"
                }
              })
            ]);
          },
          // width: 500,
          slot: "insKindName"
        },
        {
          renderHeader: h => {
            return h("div", [
              h("span", "保额"),
              h("span", {
                style: {
                  color: "red",
                  fontSize: "17px",
                  position: "relative",
                  top: "5px"
                }
              }),
            ]);
          },
          key: "insuredAmt",
          width: 180,
          slot: "insuredAmt"
        },
        {
          renderHeader: h => {
            return h("div", [
              h("span", "保费"),
              h("span", {
                style: {
                  color: "red",
                  fontSize: "17px",
                  position: "relative",
                  top: "5px"
                }
              })
            ]);
          },
          key: "premium",
          width: 180,
          slot: "premium"
        }
        // { renderHeader: (h) => { return h('div', [h('span', '保费(元)'), h('span', { style: { color: 'red', fontSize: '17px', position: 'relative', top: '5px' } })]) },
        //   key: 'mount',
        //   width: 170,
        //   slot: 'mount'
        // },
        // { renderHeader: (h) => { return h('div', [h('span', '车船税'), h('span', { style: { color: 'red', fontSize: '17px', position: 'relative', top: '5px' } })]) },
        //   key: 'ccshui',
        //   width: 170,
        //   slot: 'ccshui'
        // },
        // { renderHeader: (h) => { return h('div', [h('span', '合计'), h('span', { style: { color: 'red', fontSize: '17px', position: 'relative', top: '5px' } })]) },
        //   key: 'count',
        //   width: 170,
        //   slot: 'count'
        // },
        // { renderHeader: (h) => { return h('div', [h('span', '备注'), h('span', { style: { color: 'red', fontSize: '17px', position: 'relative', top: '5px' } })]) },
        //   key: 'remark',
        //   align: 'left',
        //   slot: 'remark'
        // }
      ],
      glassTypeLIst:[],
      check: false,
      selectCheckbox:false
    };
  },
  watch: {
    modalbl: function(val) {
      if (val) {
        this.$validator.reset();
        this.$validator._paused = true;
        // this.$refs.uploadfi.filedatalist = []
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    selectData(mg){
      console.log(mg);
      console.log(129)
    },
    getData(){
      this.cxxzList.forEach((item, i) => {
        if (item.insKindClassify == "1") { // 最好用 ===，类型是自己定的
          // if(item.premium!=""){ //判断不为空 直接 !item.premium 就可以了，不需要 “” undefined null……
          //   item.checkbox=true
          // }else{
          //   item.checkbox=false
          // }
          item.checkbox = true;
          this.zxlist.push(item);
        } else if (item.insKindClassify == "2") {
          this.cyfjxlist.push(item);
        } else {
          this.bcyfjxlist.push(item);
        }
      });
      this.tableloading=false;
    },
    selectxz(row,index){
      // console.log(row,index);
      // this.zxlist[index].checkbox= !this.zxlist[index].checkbox; //不能用这里的数据，因为row是表格里面的数据
      // 里面应该是做了深拷贝，跟外层脱离了绑定，而且这里已经用了 render的话 ，就不因该用rowClick事件，一 就用目前的render的复选框，目前已经改好的，注意表格 @on-row-click="selectxz"  这个现在是可以去掉的
      //二 就是直接模拟官方文档的那个表哥写法，这个你自己有空看一下
    //  console.log(row)
    },
    selectxz1(){
      console.log(arguments);
    },
    selectcy(row){
      this.cyfjxinfolist=row
    },
    selectbcy(row){
      this.bcyfjxinfolist=row
    },
    validresult() {
      this.selectcxxzlist=[...this.zxinfolist,...this.cyfjxinfolist,...this.bcyfjxinfolist]
      this.$validator._paused = false;
      return this.$validator.validateAll();
    },
    showTable(){
          console.log(12)
      console.log(this.zxlist);
      // 下面的代码 写的很乱，不用这么麻烦，感觉你这里写的就跟写jq一样
       for(let i=0;i<this.selectcxxzlist.length;i++){
          if(this.selectcxxzlist[i].insKindClassify==1){
            for(let j=0;j<this.zxlist.length;j++){
              if(this.zxlist[j].insKindCode==this.selectcxxzlist[i].insKindCode){
                 this.$set(this.zxlist[j],"insuredAmt",this.selectcxxzlist[i].insuredAmt)
                 this.$set(this.zxlist[j],"premium",this.selectcxxzlist[i].premium)
                 this.$set(this.zxlist[j],"carInsuredAmt",this.selectcxxzlist[i].carInsuredAmt)
                 this.$set(this.zxlist[j],"carSeatNum",this.selectcxxzlist[i].carSeatNum)
                //  this.zxlist[i].insuredAmt=this.selectcxxzlist[i].insuredAmt
              }
            }

          //  this.zxlist=new Array(this.selectcxxzlist[i]);
          //  console.log("数据12")
          //  console.log(this.zxlist)
          }else if(this.selectcxxzlist[i].insKindClassify==2){
             for(let j=0;j<this.cyfjxlist.length;j++){
              if(this.cyfjxlist[j].insKindCode==this.selectcxxzlist[i].insKindCode){
                 this.$set(this.cyfjxlist[j],"insuredAmt",this.selectcxxzlist[i].insuredAmt)
                 this.$set(this.cyfjxlist[j],"premium",this.selectcxxzlist[i].premium)
                 this.$set(this.cyfjxlist[j],"glassType",this.selectcxxzlist[i].glassType)
                 this.$set(this.cyfjxlist[j],"repairShopInsType",this.selectcxxzlist[i].repairShopInsType)
                 this.$set(this.cyfjxlist[j],"repairShopInsRate",this.selectcxxzlist[i].repairShopInsRate)
                //  this.zxlist[i].insuredAmt=this.selectcxxzlist[i].insuredAmt
              }
            }
            //  this.jsccs(this.cyfjxlist,this.selectcxxzlist[i])
            // this.cyfjxlist.push(this.selectcxxzlist[i]);
          }else if(this.selectcxxzlist[i].insKindClassify==3){
            for(let j=0;j<this.cyfjxlist.length;j++){
              if(this.bcyfjxlist[j].insKindCode==this.selectcxxzlist[i].insKindCode){
                 this.$set(this.bcyfjxlist[j],"insuredAmt",this.selectcxxzlist[i].insuredAmt)
                 this.$set(this.bcyfjxlist[j],"premium",this.selectcxxzlist[i].premium)
                 this.$set(this.bcyfjxlist[j],"dayIndemnityAmt",this.selectcxxzlist[i].dayIndemnityAmt)
                 this.$set(this.bcyfjxlist[j],"days",this.selectcxxzlist[i].days)
                //  this.zxlist[i].insuredAmt=this.selectcxxzlist[i].insuredAmt
              }
            }
          }
        }
    },
  }
};
</script>

<style lang="less" scoped>
// less 就要写lang ='less',我这里都会报错
.ivu-select,
.ivu-input-wrapper {
  width: 200px;
}
.ivu-date-picker {
  width: 200px;
}
.span_title {
  font-weight: 700;
}
.tooltip_btn {
  margin-left: 20px;
}
.radio_style {
  margin-right: 10px;
}
.small_style {
  width: 100%;
}
.table_style {
  margin-left: 20px;
}
/deep/ th.ivu-table-column-center div.ivu-table-cell>span{
  display: none!important;
}
.table_style {
  /* // margin-left: 20px; */
  width: 70%;
  margin: auto;
}
.table-title {
  margin-top: 30px;
}
</style>
