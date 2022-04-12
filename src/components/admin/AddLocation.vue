<template>
  <a-card
    :body-style="{ padding: '24px 32px' }"
    :bordered="false"
    title="Add location"
  >
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="ISBN"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }"
      >
        <a-input
          disabled
          v-decorator="[
            'ISBN',
            {
              rules: [
                {
                  required: true,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        label="Room number"
        :labelCol="{ span: 7 }"
        :wrapperCol="{ span: 10 }"
      >
        <a-input
          v-decorator="[
            'room_number',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input room number!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
        <span slot="label"> Book shelf </span>
        <a-input
          v-decorator="[
            'book shelf',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input book shelf',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
        <span slot="label"> Side </span>
        <a-input
          v-decorator="[
            'side',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input side',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="{ span: 7 }" :wrapperCol="{ span: 10 }">
        <span slot="label"> Layer </span>
        <a-input
          v-decorator="[
            'book shelf',
            {
              rules: [
                {
                  required: true,
                  message: 'Please input book shelf',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item
        style="margin-top: 24px"
        :wrapperCol="{ span: 10, offset: 7 }"
      >
        <a-button :loading="loading" type="primary" html-type="submit"
          >Add</a-button
        >
        <a-button @click="$router.push('/admin?tab=user')">CANCEL</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getAccessToken } from "../../services/user";
export default {
  name: "UserAdd",
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
      loading: false,
      imageUrl: "",
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "userAdd" });
  },
  created() {
    console.log(this.$route.params.id);
    let that = this;
    this.$nextTick(() => {
        this.form.setFieldsValue({
            ISBN: that.$route.params.id,
        })
    })
  },
  methods: {
    handleSubmit(e) {
      let that = this;
      this.loading = true;
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          let valuesSubmit = { ...values };
          valuesSubmit.avatar = that.imageUrl;
          console.log(1);
          var myHeaders = new Headers();
          myHeaders.append("token", getAccessToken());
          myHeaders.append("Content-Type", "application/json");
          console.log(valuesSubmit);
          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(valuesSubmit),
          };
          console.log(222);
          fetch(`${that.$global.BASE_URL}/api/admin/user/add`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              if (result.code == 0 || result.code == "0") {
                that.loading = false;
                that.$message.success("Add user successfully");
                that.$router.push("/admin?tab=user");
              } else {
                that.loading = false;
                that.$message.error("API call error, " + result.msg);
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