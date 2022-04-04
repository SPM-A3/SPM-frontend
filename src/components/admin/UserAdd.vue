<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="新增图书">
    <a-form>
        <a-form-item
          label="头像"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :customRequest="upload"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
                上传头像
            </div>
            </div>
          </a-upload>
        </a-form-item>
      <a-form-item
        :label="id"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
         <a-input :placeholder="idInput" v-model="newUserInfo.id"/>
      </a-form-item>
      <a-form-item
        :label="gender"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-radio-group name="genderGroup" v-model="newUserInfo.gender">
            <a-radio :value="0">
            男
            </a-radio>
            <a-radio :value="1">
            女
            </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :label="position"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-radio-group name="positionGroup" v-model="newUserInfo.position">
            <a-radio :value="0">
            学生
            </a-radio>
            <a-radio :value="1">
            教师
            </a-radio>
            <a-radio :value="2">
            职工
            </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :label="email"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input :placeholder="emailInput" v-model="newUserInfo.email"/>
      </a-form-item>
      <a-form-item
        :label="phoneNumber"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-input :placeholder="phoneNumberInput" v-model="newUserInfo.phone_number"/>
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-alert :type="alert.type" :message="alert.message" v-if="alert.showAlert" banner />
        <a-button @click="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
    name: "UserAdd",
    data() {
        return {
            loading: false,
            imageUrl: '',
            id: "学号（工号）",
            idInput: "请输入学号（工号）",
            name: "姓名",
            nameInput: "请输入姓名",
            gender: "性别",
            genderInput: "请选择性别",
            position: "职位",
            positionInput: "请选择职位",
            email: "邮箱",
            emailInput: "请输入邮箱",
            phoneNumber: "手机号",
            phoneNumberInput: "请输入手机号",
            password: "密码",
            passwordInput: "请输入密码",
            verify: "确认密码",
            verifyInput: "确认密码",
            newUserInfo: {
                id: "",
                name: "",
                avatar: "",
                gender: "",
                position: "",
                email: '',
                phone_number:'',
                password: '',
            },
            alert: {
                showAlert: false,
                type: "warning",
                message: ""
            }
        }
    },
    methods: {
      handleUpdate(info) {
        if (info.file.status === 'uploading') {
          this.loading = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.loading = false;
          });
        }
      },
      upload(option) {
        let that = this;
        this.loading = true;
        const reader = new FileReader();
        reader.readAsDataURL(option.file);
        reader.onloadend = function(e) {
          let base64 = e.target.result.toString().split(',')[1];
          if (e && e.target && e.target.result) {
            var raw = base64;
            var requestOptions = {
              method: 'POST',
              body: raw,
            };

            fetch("https://service-rb270dgm-1301774019.gz.apigw.tencentcs.com/release/SPM_uploadimage", requestOptions)
              .then(response => response.text())
              .then(result => {
                this.loading = false;
                that.imageUrl = result;
                that.newUserInfo.avatar = result;
                console.log(result);
              })
              .catch(error => {console.log('error', error);that.loading = false});
          }
        };
      },
      submit(){
          this.checkAndParsePhoneNumber();
      },
      checkAndParsePhoneNumber(){
          let reg = /^\d{11}$/;
          if(reg.test(this.newUserInfo.phoneNumber)){
              return true;
          }
      }
    },
    filter(inputValue, path) {
      return path.some(
        (option) =>
          option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      );
    },
}
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 160px;
  height: 160px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
img {
  height: 160px;
}
</style>