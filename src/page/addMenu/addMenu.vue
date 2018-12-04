<template>
  <div>
  <!-- 图片上传组件辅助-->
  <el-upload
    class="avatar-uploader"
    action="api/admin/upFile"
    name="img"
    :show-file-list="false"
    :headers='header'
    :on-success="uploadSuccess"
    :on-error="uploadError"
    :before-upload="beforeUpload">
  </el-upload>
  <!--富文本编辑器组件-->
  <quill-editor
    class="editor"
    v-model="form.content"
    ref='myQuillEditor'
    serverUrl="api/admin/upFile"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  >
  </quill-editor>
</div>
</template>
<script>
  import { quillEditor } from "vue-quill-editor";
  import * as Quill from "quill"; //引入编辑器
  //quill图片可拖拽改变大小
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"] // remove formatting button
  ];
  export default {
    data() {
      return {
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: "", // 这里写你要上传的图片服务器地址
        header: { token: localStorage.getItem("token") }, // 有的图片服务器要求请求头需要有token之类的参数，写在这里
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
                image: function(value) {
                  if (value) {
                    console.log(value);
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                }
              }
            }
          }
        },
        form: {
          content: ""
        },
        rules: {
          content: [{ required: true, message: "请输入内容", trigger: "blur" }]
        },
      };
    },
    created() {
      // this.getdata();
      this.token = localStorage.getItem("token");
      this.getheader();
    },
    methods: {
      //获取header
      getheader() {
        this.header = {
          Authorization: "Bearer " + this.token
        };
      },
      onEditorReady() {},
      onEditorFocus() {},
      onEditorBlur() {},
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
        console.log(res)
        console.log(this.$refs);
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

    }
  }

</script>
