<template>
  <div>
    <div class="editrole_center">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <!--<el-form-item label="产品分类 " prop="value1" style="width: 300px">-->
        <!--<el-select v-model="ruleForm.value1" style="width: 200px" @change="categorysChangeHandler">-->
        <!--<el-option-->
        <!--v-for="item in categorys"-->
        <!--:key="item.id"-->
        <!--:label="item.title"-->
        <!--:value="item.id"-->
        <!--&gt;-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="产品规格 " prop="checkList">-->
        <!--&lt;!&ndash;{{specs}} {{ruleForm.checkList}}&ndash;&gt;-->
        <!--<el-checkbox-group v-model="ruleForm.checkList" @change="specsChangeHandler">-->
        <!--<el-checkbox v-for="val in edit.specs" :label="val.id" :key="val.id">{{val.title}}</el-checkbox>-->
        <!--</el-checkbox-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="产品品牌 " prop="value2" style="width: 300px">-->
        <!--<el-select v-model="ruleForm.value2" style="width: 200px">-->
        <!--<el-option-->
        <!--v-for="item in brands"-->
        <!--:key="item.id"-->
        <!--:label="item.title"-->
        <!--:value="item.id"-->
        <!--&gt;-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="产品单位 " prop="value3" style="width: 300px">-->
        <!--<el-select v-model="ruleForm.value3" style="width: 200px">-->
        <!--<el-option-->
        <!--v-for="item in units"-->
        <!--:key="item.id"-->
        <!--:label="item.title"-->
        <!--:value="item.id"-->
        <!--&gt;-->
        <!--</el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <el-form-item label="产品名称 " prop="inputName" style="width: 500px">
          <el-input placeholder="请输入产品名称" style="width: 400px" v-model="ruleForm.inputName"></el-input>
        </el-form-item>
        <el-form-item label="产品标题 " prop="inputTitle" style="width: 500px">
          <el-input placeholder="请输入产品副标题" style="width: 400px" v-model="ruleForm.inputTitle"></el-input>
        </el-form-item>
        <!--<el-form-item label="市场价格 " prop="inputPrice" style="width: 500px">-->
        <!--<el-input type="number" placeholder="请输入出售价格" style="width: 400px" v-model="ruleForm.inputPrice"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="批发价格 " prop="inputTrade_price" style="width: 500px">-->
        <!--<el-input type="number" placeholder="请输入出售价格" style="width: 400px"-->
        <!--v-model="ruleForm.inputTrade_price"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="出售价格 " prop="inputSell" style="width: 500px">
          <el-input type="number" placeholder="请输入出售价格" style="width: 400px" v-model="ruleForm.inputSell"></el-input>
        </el-form-item>
        <el-form-item label="产品封面" prop="srcOthers2">
          <div class="fileBox1">
              <span class="fileinput-button">
              <img :src="ruleForm.srcOthers2" alt="" width="148" height="148">
              <i v-show="!ruleForm.srcOthers2" class="el-icon-plus font"></i>
              <input ref="inputFileRef" type='file' name='img_path' @change="getFile($event)"
                     style="width: 148px;height: 148px;">
              </span>
          </div>
        </el-form-item>
        <el-form-item label="产品图片" prop='banner'>
          <el-upload
            action="api/admin/upFiles"
            list-type="picture-card"
            name='files[]'
            :limit=4
            :multiple=true
            :file-list='fileList'
            :headers='header'
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccessed"
            :on-exceed='uploadMore'
            v-model="ruleForm.banner">
            <i class="el-icon-plus" style='font-size:12px'>多图上传(最多4张)</i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <!--<el-form-item label="产品图片" prop='content'>-->
        <!--<el-form ref="form" label-width="10px">-->
        <!--<div>-->
        <!--&lt;!&ndash; 图片上传组件辅助&ndash;&gt;-->
        <!--<el-upload-->
        <!--class="avatar-uploader"-->
        <!--action="api/admin/upFile"-->
        <!--name="img"-->
        <!--:show-file-list="false"-->
        <!--:headers='header'-->
        <!--:on-success="uploadSuccess"-->
        <!--:on-error="uploadError"-->
        <!--:before-upload="beforeUpload">-->
        <!--</el-upload>-->
        <!--&lt;!&ndash;富文本编辑器组件&ndash;&gt;-->
        <!--<quill-editor-->
        <!--class="editor"-->
        <!--v-model="ruleForm.content"-->
        <!--ref='myQuillEditor'-->
        <!--serverUrl="api/admin/upFile"-->
        <!--:options="editorOption"-->
        <!--@blur="onEditorBlur($event)"-->
        <!--@focus="onEditorFocus($event)"-->
        <!--@ready="onEditorReady($event)"-->
        <!--&gt;-->
        <!--</quill-editor>-->
        <!--</div>-->
        <!--</el-form>-->
        <!--</el-form-item>-->
      </el-form>
      <el-table
        border
        :data="tableData"
        style="width:80%;margin-left: 100px">
        <el-table-column prop="name" label="产品名称" align="center">
        </el-table-column>
        <el-table-column prop="cover" label="产品封面" align="center">
          <template slot-scope="scope">
            <div class="fileBox1">
              <span class="fileinput-button1">
              <img :src="scope.row.cover" alt="" width="148" height="148">
                <i v-show="!scope.row.cover" class="el-icon-plus font"></i>
              <input type='file' name='img_path' @change="getCoverFile($event, scope)"
              >
              </span>
            </div>
            <!--<input type="file"/>-->
          </template>
        </el-table-column>
        <el-table-column prop="price" label="出售价格" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.price"/>
          </template>
        </el-table-column>
        <el-table-column prop="sell" label="市场价格" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.sell"/>
          </template>
        </el-table-column>
        <el-table-column prop="trade_price" label="批发价格" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.trade_price"/>
          </template>
        </el-table-column>
        <el-table-column prop="quality" label="库存" align="center">
          <template slot-scope="scope">
            <el-input type="number" v-model="scope.row.quality"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="editrole_bottom">
      <button @click="submission()" class="modify1">确定</button>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {quillEditor} from "vue-quill-editor";
  import * as Quill from "quill"; //引入编辑器
  //quill图片可拖拽改变大小
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{header: 1}, {header: 2}], // custom button values
    [{list: "ordered"}, {list: "bullet"}],
    [{script: "sub"}, {script: "super"}], // superscript/subscript
    [{indent: "-1"}, {indent: "+1"}], // outdent/indent
    [{direction: "rtl"}], // text direction
    [{size: ["small", false, "large", "huge"]}], // custom dropdown
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    [{color: []}, {background: []}], // dropdown with defaults from theme
    [{font: []}],
    [{align: []}],
    ["link", "image", "video"],
    ["clean"] // remove formatting button
  ];

  export default {
    name: "NewPlist",
    data() {
      return {
        token: '',
        images: [],
        cover: '',
        ruleForm: {
          value1: "",
          value2: "",
          value3: "",
          checkList: [],
          inputName: '',
          inputTitle: '',
          inputSell: '',
          srcOthers2: '',
          banner: '',
          inputTrade_price: '',
          inputPrice: '',
          quill_editor: '',
          content: ""
        },
        //添加用户表单验证规则
        rules: {
          value1: [{required: true, message: '请选择产品分类'}],
          value2: [{required: true, message: '请选择产品品牌'}],
          value3: [{required: true, message: '请选择产品单位'}],
          checkList: [{required: true, message: '请选择产品规格'}],
          inputName: [{required: true, message: '请输入产品名称'}],
          inputSell: [{required: true, message: '请输入出售价格'}],
          srcOthers2: [{required: true, message: '请选择产品封面'}],
          banner: [{required: true, message: '请选择产品图片'}],
          inputTrade_price: [{required: true, message: '请输入批发价格'}],
          inputPrice: [{required: true, message: '请选择市场价格'}],
          content: [{required: true, message: "请输入内容", trigger: "blur"}]
        },
        imgUrl: '',
        dialogImageUrl: '',
        dialogVisible: false,
        brands: [],
        categorys: [],
        units: [],
        specs: [],
        tableData: [],
        fileList: [],
        header: {'token': localStorage.getItem("token")},
        data1: [],
        editorOption: {}, // 必须初始化为对象 init  to Object
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: "", // 这里写你要上传的图片服务器地址
        header: {token: localStorage.getItem("token")}, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
        detailContent: "", // 富文本内容
        editorOption: {
          placeholder: "",
          theme: "snow", // or 'bubble'
          modules: {
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                image: function (value) {
                  if (value) {
                    // console.log(value);
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        },
        edit: {},
        goodImages1: []
      }

    },
    created() {
      let tmpArr = []
      // 绑定表格数据
      this.tableData = tmpArr.map(itm => ({
        name: null, // 产品名称
        price: null, // 产品价格
        cover: null,// 产品封面
        trade_price: null,//批发价格
        sell: null,//出售价格
        quality: null//库存
      }))
      this.getEdit();
      this.getData()
      this.token = localStorage.getItem("token");
      this.getheader();
      // console.log(this.editorOption)
    },
    methods: {
      // 编辑
      getEdit() {
        let edit = this.$route.query.edit;
        this.edit = edit;
        let {p_category_cate_id, p_category_brand_id, p_category_unit_id, title, subtitle, price, sell, trade_price, cover, content, goodImages, specs} = this.edit
        this.ruleForm = {
          value1: p_category_cate_id,
          value2: p_category_brand_id,
          value3: p_category_unit_id,
          inputName: title,
          inputTitle: subtitle,
          inputPrice: price,
          inputSell: sell,
          inputTrade_price: trade_price,
          srcOthers2: cover,
          content: content,
        };
        let checkList = this.edit.specs.map(itm => itm.id)
        this.ruleForm.checkList = checkList

        this.tableData = this.edit.skus
        let temp = this.edit.goodImages;
        if (temp.length > 0) {
          for (let t = 0; t < temp.length; t++) {
            this.fileList.push({name: 'name' + temp[t].id, url: temp[t].cover});
            if (t === 0) {
              this.fileList.cover += temp[t].cover
            } else {
              this.fileList.cover += ',' + temp[t].cover;
            }
          }
        }
      },
      //获取header
      getheader() {
        this.header = {
          Authorization: "Bearer " + this.token
        };
      },
      onEditorReady() {
      },
      onEditorFocus() {
      },
      onEditorBlur() {
      },
      beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true;
      },
      onEditorChange() {
        // console.log(123)
      },
      uploadSuccess(res, file) {
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        // console.log(res)
        // console.log(this.$refs);
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res) {
          // 获取光标所在位置
          let length = quill.getSelection().index;
          // 插入图片  res为服务器返回的图片地址
          quill.insertEmbed(length, "image", res.up_file);
          // 调整光标到最后
          quill.setSelection(length + 1);
        } else {
          this.$message.error("图片插入失败");
        }
        // loading动画消失
        this.quillUpdateImg = false;
      },

      // 富文本图片上传失败
      uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error("图片插入失败");
      },
      // 渲染列表
      getData() {
        axios.get("/api/admin/good_create_show",
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            this.brands = res.data.data.data.brands;
            this.categorys = res.data.data.data.categorys;
            this.specs = res.data.data.data.categorys.specs;
            // console.log(res.data, 'b')
            // console.log(this.specs, 'specs')
            this.units = res.data.data.data.units;
          })
      },
      //上传限制
      beforeAvatarUpload(file) {
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      //移除图片列表
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      //展示图片列表
      handlePictureCardPreview(file) {

        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //多图上传成功
      uploadSuccessed(res, file, fileList) {
        this.ruleForm.banner = fileList.map(itm => itm.response)
      },
      uploadMore() {
        this.$message.error("最多上传4张");
      },
      //上传单图
      getFile(event) {
        let _this = this;
        var files = (this.ruleForm.img_path = event.target.files[0]);
        if (!event || !window.FileReader) return;
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onloadend = function () {
          _this.ruleForm.srcOthers2 = this.result;
          let testFile = new FormData();
          testFile.append('img', files)
          // console.log(files, event, testFile.get('file'))
          let data = testFile
          axios.post("api/admin/upFile",
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + _this.token,
                'Accept': 'application/vnd.lingmo.v1+json'
              }
            })
            .then(res => {
              _this.imgUrl = res.data.up_file;
              if (res.data.status == 200) {
                _this.$message({
                  message: res.data.message,
                  type: "success",
                })
              } else {
                _this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
        };

        // this.form.img_path = event.target.files[0];
      },
      // 上传产品详情图片
      getCoverFile(event, scope) {
        // console.info(event, scope)
        let _this = this;
        var files = (event.target.files[0]);
        if (!event || !window.FileReader) return;
        let reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onloadend = function () {
          // _this.ruleForm.srcOthers2 = this.result;
          let testFile = new FormData();
          testFile.append('img', files)
          // console.log(files, event, testFile.get('file'))
          let data = testFile
          axios.post("api/admin/upFile",
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + _this.token,
                'Accept': 'application/vnd.lingmo.v1+json'
              }
            })
            .then(res => {
              scope.row.cover = res.data.up_file;
              if (res.data.status == 200) {
                _this.$message({
                  message: res.data.message,
                  type: "success",
                })
              } else {
                _this.$message({
                  message: res.data.message,
                  type: "warning",
                })
              }
            })
        };

        // this.form.img_path = event.target.files[0];
      },
      // 确定提交
      submission() {
        let fileList = this.fileList.map(itm => itm.url).join(';')
        let banner = this.ruleForm.banner
        if (banner == undefined) {
          this.images = fileList;
        } else {
          let banner1 = banner.filter(itm => itm != undefined && itm != null)
          let concat = '';
          banner1.forEach((items) => {
            // concat.push(items[0])
            concat += items[0]+';'
          })
          // this.images = fileList.concat(concat);
          this.images = fileList +';'+ concat
        }
        let price = this.tableData.some(itm => itm.price == null);
        let cover = this.tableData.some(itm => itm.cover == null);
        let trade_price = this.tableData.some(itm => itm.trade_price == null);
        let sell = this.tableData.some(itm => itm.sell == null);
        let quality = this.tableData.some(itm => itm.quality == null);
        if (price) {
          this.$message.error("出售价格不能为空");
        } else if (cover) {
          this.$message.error("产品封面不能为空");
        } else if (trade_price) {
          this.$message.error("批发价格不能为空");
        } else if (sell) {
          this.$message.error("市场价格不能为空");
        } else if (quality) {
          this.$message.error("库存不能为空");
        }
        if (!this.imgUrl) {
          this.cover = this.ruleForm.srcOthers2
        } else {
          this.cover = this.imgUrl
        }
        //修改
        let data = {
          categoryId: this.ruleForm.value1,
          brandId: this.ruleForm.value2,
          unitId: this.ruleForm.value3,
          title: this.ruleForm.inputTitle,
          subtitle: this.ruleForm.inputName,
          cover: this.cover,
          price: this.ruleForm.value3,
          sell: this.ruleForm.inputPrice,
          trade_price: this.ruleForm.inputTrade_price,
          images: this.images,
          content: this.ruleForm.content,
          skus: this.tableData,
          id: this.$route.query.Id
        }
        axios.post("api/admin/good_edit",
          data,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            console.log(res)
            // if (res.data.data.data.status == 200) {
            //   this.$message({
            //     message: res.data.data.data.message,
            //     type: "success",
            //   })
            //   this.getTableData()
            //   this.mask = false;
            // } else {
            //   this.$message({
            //     message: res.data.data.data.message,
            //     type: "warning",
            //   })
            // }
          })
      },
      // 产品分类
      categorysChangeHandler(val) {
        // this.ruleForm.checkList = []
        // let tmpCate = this.categorys.filter(itm => itm.id === val)
        // if (tmpCate.length > 0) {
        //   this.specs = tmpCate[0]['specs']
        // } else {
        //   this.specs = []
        // }
      },
      // 组合数据
      combinatePart(arr) {
        return arr.reduce(function (a, b) {
          return a.map(function (x) {
            return b.map(function (y) {
              return x.concat(y);
            })
          }).reduce(function (a, b) {
            return a.concat(b)
          }, [])
        }, [[]])
      },
      // 多选框
      specsChangeHandler(val) {
        console.log(val)
        const vm = this
        this.value1 = []
        this.tableData = []
        let data = {
          ids: val
        }
        if (val.length < 1) {
          return false
        }
        axios.post("api/admin/getSpecs",
          data,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token,
              'Accept': 'application/vnd.lingmo.v1+json'
            }
          })
          .then(res => {
            // let tmpArr = []
            // // console.log(vm.combinatePart(res.data.data))
            // tmpArr = vm.combinatePart(res.data.data).map(item => item.join(','))
            // 绑定表格数据
            // this.tableData = tmpArr.map(itm => ({
            //   name: itm, // 产品名称
            //   price: null, // 产品价格
            //   cover: null,// 产品封面
            //   trade_price: null,//批发价格
            //   sell: null,//出售价格
            //   quality: null//库存
            // }))
          })
      }
    }
  }
</script>

<style scoped>
  .fileBox {
    width: 148px;
  }

  .fileBox1 {
    width: 148px;
  }

  .fileinput-button {
    height: 148px;
    width: 148px;
    float: left;
    display: flex;
    margin-top: 10px;
    margin-right: 50px;
    line-height: 150px;
    position: relative;
    color: #ccc;
    border: 1px dashed #ccc;
    background-position: center 50px;
    border-radius: 6px;
  }

  .fileinput-button input {
    position: absolute;
    left: 0px;
    top: 60px;
    opacity: 0;
    -ms-filter: "alpha(opacity=0)";
  }

  .fileinput-button1 {
    height: 148px;
    width: 148px;
    float: left;
    display: flex;
    margin-top: 10px;
    margin-right: 50px;
    line-height: 150px;
    position: relative;
    color: #ccc;
    background-position: center 50px;
    border-radius: 6px;
  }

  .fileinput-button1 input {
    position: absolute;
    left: 0px;
    top: 60px;
    opacity: 0;
    -ms-filter: "alpha(opacity=0)";
  }

  .font {
    font-size: 20px;
    position: absolute;
    left: 60px;
    top: 60px;
  }

  .editrole_bottom {
    width: 100%;
    margin-left: 45%;
    margin-top: 40px;
  }

  .avatar-uploader {
    height: 12px;
  }
  .modify1 {
    background-color: #00c6b0;
    color: #fff;
    border: 0;
    width: 70px;
    height: 40px;
    border-radius: 10px;
    font-size: 15px;
  }


</style>
<style>
  .el-upload--picture-card {
    margin-top: 10px;
  }

  .el-upload-list--picture-card .el-upload-list__item {
    margin-top: 10px;
  }

  .ql-editor {
    height: 200px;
  }

  .el-form-item {
    width: 87.5%;
  }
</style>
