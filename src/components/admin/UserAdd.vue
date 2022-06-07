<template>
  <a-card
    :body-style="{ padding: '24px 32px' }"
    :bordered="false"
    title="Add user"
  >
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="avatar"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }"
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
            <a-icon :type="uploading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">UPDATE AVATAR</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item  label="ID" :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-input
          v-decorator="[
            'id',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your ID!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item  label="E-mail" :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-input
          v-decorator="[
            'email',
            {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <!-- <a-form-item  label="Password" has-feedback :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-input
          v-decorator="[
            'password',
            {
              rules: [
                {
                  required: true,
                  message: 'Using default 123456',
                },
              ],
            },
          ]"
          type="password"
          disabled
        />
      </a-form-item> -->
      <a-form-item  :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <span slot="label"> Name </span>
        <a-input
          v-decorator="[
            'name',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input your name!',
                  whitespace: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item  label="gender" :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-select
          v-decorator="[
            'gender',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select your gender!',
                  whitespace: true,
                  type: 'number',
                },
              ],
            },
          ]"
        >
          <a-select-option :value="0"> Male </a-select-option>
          <a-select-option :value="1"> Female </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item  label="Position" :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-select
          v-decorator="[
            'position',
            {
              rules: [
                {
                  required: true,
                  message: 'Please select your position!',
                  whitespace: true,
                  type: 'number',
                },
              ],
            },
          ]"
        >
          <a-select-option :value="0"> Student </a-select-option>
          <a-select-option :value="1"> Teacher </a-select-option>
          <a-select-option :value="2"> Staff </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item  label="Phone Number" :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }">
        <a-input
          v-decorator="[
            'phone_number',
            {
              rules: [
                { required: true, message: 'Please input your phone number!' },
              ],
            },
          ]"
          style="width: 100%"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        style="margin-top: 24px"
        :wrapperCol="{ span: 10, offset: 7 }"
      >
        <a-button :loading="loading" type="primary" html-type="submit">Add</a-button>
        <a-button @click="$router.push('/admin?tab=user')">CANCEL</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getAccessToken } from '../../services/user';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  name: "UserAdd",
  data() {
    return {
      // form: undefined,
      confirmDirty: false,
      autoCompleteResult: [],
      uploading: false,
      loading: false,
      imageUrl: "",
      defaultPwd: "123456",
      newUserInfo: {
        id: "",
        name: "",
        avatar: "",
        gender: -1,
        position: -1,
        email: "",
        phone_number: "",
        password: "",
      },
      alert: {
        showAlert: false,
        type: "warning",
        message: "",
      },
    };
  },
  beforeCreate(){
    this.form = this.$form.createForm(this, { name: 'userAdd' });
  },
  methods: {
    handleUpdate(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    upload(option) {
      let that = this;
      this.uploading = true;
      const reader = new FileReader();
      reader.readAsDataURL(option.file);
      reader.onloadend = function (e) {
        let base64 = e.target.result.toString().split(",")[1];
        if (e && e.target && e.target.result) {
          var raw = base64;
          var requestOptions = {
            method: "POST",
            body: raw,
          };

          fetch(
            "https://service-rb270dgm-1301774019.gz.apigw.tencentcs.com/release/SPM_uploadimage",
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => {
              that.uploading = false;
              that.imageUrl = result;
              that.newUserInfo.avatar = result;
              console.log(result);
            })
            .catch((error) => {
              console.log("error", error);
              that.uploading = false;
            });
        }
      };
    },
    handleSubmit(e) {
      let that = this;
      this.loading = true;
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let valuesSubmit = {...values};
          valuesSubmit.avatar = that.imageUrl;
          valuesSubmit.password = that.defaultPwd;
          console.log(1);
          var myHeaders = new Headers();
          myHeaders.append("token", getAccessToken());
          myHeaders.append("Content-Type", "application/json");
          console.log(valuesSubmit)
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(valuesSubmit),
          };
          fetch(`${that.$global.BASE_URL}/api/admin/user/add`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.code == 0 || result.code == "0") {
                that.loading = false;
                that.$message.success("Add user successfully");
                that.$router.push('/admin?tab=user')
              } else {
                that.loading = false;
                that.$message.error("API call error, "+result.msg);
              }
            })
            .catch((error) => {
              console.log("error", error);
              that.loading = false;
              that.$messge.error("API call error.");
            });
        } else {
          that.loading = false;
          console.log(2);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
  },
  filter(inputValue, path) {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  },
};
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