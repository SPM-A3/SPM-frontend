<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="Add book">
    <a-form>
        <a-form-item
          label="cover"
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
            <img v-if="newBookInfo.cover" :src="newBookInfo.cover" alt="avatar" />
            <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
                UPLOAD COVER
            </div>
            </div>
          </a-upload>
        </a-form-item>
      <a-form-item
        :label="bookName"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="bookNameInput" v-model="newBookInfo.book_name"/>
      </a-form-item>
      <a-form-item
        :label="author"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="authorInput" v-model="newBookInfo.author"/>
      </a-form-item>
      <a-form-item
        :label="publisher"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="publisherInput" v-model="newBookInfo.publisher"/>
      </a-form-item>
      <a-form-item
        :label="ISBN"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
        <a-input :placeholder="ISBNInput" v-model="newBookInfo.ISBN"/>
      </a-form-item>
      <a-form-item
        :label="publishedTime"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-month-picker
            :placeholder="publishedTimeInput"
            style="width: 100%"
            v-model="newBookInfo.published_time"
        />
      </a-form-item>
      <a-form-item
        :label="category"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        
      >
         <a-cascader
            :options="options"
            :placeholder="categoryInput"
            :show-search="{ filter }"
            v-model="newBookInfo.category"
        />
      </a-form-item>
      <a-form-item
        :label="briefIntroduction"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
      >
        <a-textarea rows="4" :placeholder="briefIntroductionInput" v-model="newBookInfo.brief_introduction"/>
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button @click="submit" type="primary">Add</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getAccessToken } from '../../services/user';
import options from './category'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
    name: "BookAdd",
    data() {
        return {
            baseUrl: "https://www.fastmock.site/mock/0aee7559464fadc986c2e38e63492a86/spm",
            loading: false,
            bookName: "Book name",
            bookNameInput: "Please input book name",
            author: "Author",
            authorInput: "Please input author",
            publisher: "Publisher",
            publisherInput: "Please input publisher",
            ISBN: "ISBN",
            ISBNInput: "Please input ISBN",
            category: "Category",
            categoryInput: "Please enter or select category",
            publishedTime: "Publish date",
            publishedTimeInput: "Please select publish date",
            briefIntroduction: "Introduction",
            briefIntroductionInput: "Please input introduction",
            newBookInfo: {
                book_name: undefined,
                author: undefined,
                publisher: undefined,
                ISBN: undefined,
                category: undefined,
                published_time: undefined,
                cover: undefined,
                brief_introduction: undefined,
            },
            options: options.options,     
        }
    },
    created(){
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
            this.newBookInfo.cover = imageUrl;
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
                that.newBookInfo.cover = result;
                console.log(result);
              })
              .catch(error => {console.log('error', error);that.loading = false});
          }
        };
      },
      submit(){
        let newBookInfoSubmit = { ... this.newBookInfo };
        newBookInfoSubmit.category = this.newBookInfo.category[1];
        // 处理时间为2020-02
        newBookInfoSubmit.published_time = newBookInfoSubmit.published_time.format("YYYY-MM-DD");
        console.log(newBookInfoSubmit);
        // 提交
        var myHeaders = new Headers();
        myHeaders.append("token", getAccessToken());
        myHeaders.append("Content-Type", "application/json");
        var body = newBookInfoSubmit;
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(body),
        };

        let that = this;
        fetch(`${this.$global.BASE_URL}/api/admin/book/add`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if(result.code === 0 || result.code === "0"){
              that.$message.success('Add book successfully')
              setTimeout(() => {
                that.$route.push("/admin?tab=user");
              }, 200)
            }else{
              that.$message.error(result.error_msg);
            }
          })
          .catch(error => {
            that.$message.error("API call failed.")
          });
      },
      filter(inputValue, path) {
        return path.some(
          (option) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );
      },
    },
}
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 160px;
  height: 220px;
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
  height: 220px;
}
</style>