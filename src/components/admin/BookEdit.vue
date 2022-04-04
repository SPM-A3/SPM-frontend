<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" title="新增图书">
    <a-form>
        <a-form-item
          label="封面"
          :labelCol="{span: 7}"
          :wrapperCol="{span: 10}"
        >
          <a-upload
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :customRequest="upload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">
                上传封面
            </div>
            </div>
          </a-upload>
        </a-form-item>
      <a-form-item
        :label="bookName"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.book_name"
      >
        <a-input :placeholder="bookNameInput" />
      </a-form-item>
      <a-form-item
        :label="author"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.author"
      >
        <a-input :placeholder="authorInput"/>
      </a-form-item>
      <a-form-item
        :label="publisher"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.publisher"
      >
        <a-input :placeholder="publisherInput"/>
      </a-form-item>
      <a-form-item
        :label="ISBN"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.ISBN"
      >
        <a-input :placeholder="ISBNInput"/>
      </a-form-item>
      <a-form-item
        :label="publishedTime"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.published_time"
      >
        <a-month-picker
            :placeholder="publishedTimeInput"
            style="width: 100%"
            @change="onChange"
        />
      </a-form-item>
      <a-form-item
        :label="category"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.category"
      >
         <a-cascader
            :options="options"
            :placeholder="categoryInput"
            :show-search="{ filter }"
        />
      </a-form-item>
      <a-form-item
        :label="briefIntroduction"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 10}"
        v-model="newBookInfo.brief_introduction"
      >
        <a-textarea rows="4" :placeholder="briefIntroductionInput"/>
      </a-form-item>
      <a-form-item style="margin-top: 24px" :wrapperCol="{span: 10, offset: 7}">
        <a-button type="primary">提交</a-button>
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
    name: "BookEdit",
    data() {
        return {
            loading: false,
            imageUrl: '',
            bookName: "书名",
            bookNameInput: "请输入书名",
            author: "作者",
            authorInput: "请输入作者",
            publisher: "出版社",
            publisherInput: "请输入出版社",
            ISBN: "ISBN",
            ISBNInput: "请输入ISBN码",
            category: "分类号",
            categoryInput: "请输入或选择分类号",
            publishedTime: "出版时间",
            publishedTimeInput: "请选择出版时间",
            briefIntroduction: "简介",
            briefIntroductionInput: "请输入简介",
            newBookInfo: {
                book_name: "",
                author: "",
                publisher: "",
                ISBN: "",
                category: '',
                published_time:'',
                cover: '',
                brief_introduction: '',
            },
            options: [
                {
                value: "A",
                label: "A马克思主义、列宁主义、毛泽东思想、邓小平理论",
                children: [
                    {
                    value: "A",
                    label: "全部",
                    },
                    {
                    value: "A1",
                    label: "A1马克思、恩格斯著作",
                    },
                    {
                    value: "A2",
                    label: "A2毛泽东著作",
                    },
                    {
                    value: "A3",
                    label:
                        "A3马克思主义、列宁主义、毛泽东思想、邓小平理论的学习和研究",
                    },
                ],
                },
                {
                value: "B",
                label: "B哲学、宗教",
                children: [
                    {
                    value: "B",
                    label: "全部",
                    },
                    {
                    value: "B0",
                    label: "B0哲学理论",
                    },
                    {
                    value: "B81",
                    label: "B81逻辑学",
                    },
                    {
                    value: "B84",
                    label: "B84心理学",
                    },
                ],
                },
                {
                value: "C",
                label: "C社会科学总论",
                children: [
                    {
                    value: "C",
                    label: "全部",
                    },
                    {
                    value: "C0",
                    label: "C0社会科学理论与方法论",
                    },
                    {
                    value: "C91",
                    label: "C91社会学",
                    },
                    {
                    value: "C8",
                    label: "C8统计学",
                    },
                    {
                    value: "C93",
                    label: "C93管理学",
                    },
                ],
                },
                {
                value: "D",
                label: "D政治、法律",
                children: [
                    {
                    value: "D",
                    label: "全部",
                    },
                    {
                    value: "D2",
                    label: "D2中国共产党",
                    },
                    {
                    value: "D8",
                    label: "D8外交、国际关系",
                    },
                    {
                    value: "D9",
                    label: "D9法律",
                    },
                ],
                },
                {
                value: "E",
                label: "E军事",
                children: [
                    {
                    value: "E",
                    label: "全部",
                    },
                    {
                    value: "E0",
                    label: "E0军事理论",
                    },
                    {
                    value: "E2",
                    label: "E2中国军事",
                    },
                ],
                },
                {
                value: "F",
                label: "F经济",
                children: [
                    {
                    value: "F",
                    label: "全部",
                    },
                    {
                    value: "F0",
                    label: "F0经济学",
                    },
                    {
                    value: "F8",
                    label: "F8财政、金融",
                    },
                ],
                },
                {
                value: "G",
                label: "G文化、科学、教育、体育",
                children: [
                    {
                    value: "G",
                    label: "全部",
                    },
                    {
                    value: "G4",
                    label: "G4教育",
                    },
                    {
                    value: "",
                    label: "G8体育",
                    },
                ],
                },
                {
                value: "H",
                label: "H语言、文字",
                children: [
                    {
                    value: "H",
                    label: "全部",
                    },
                    {
                    value: "H0",
                    label: "H0语言学",
                    },
                    {
                    value: "H1",
                    label: "H1汉语",
                    },
                    {
                    value: "H3",
                    label: "H3常用外国语",
                    },
                ],
                },
                {
                value: "I",
                label: "I文学",
                children: [
                    {
                    value: "I",
                    label: "全部",
                    },
                    {
                    value: "I1",
                    label: "I1世界文学",
                    },
                    {
                    value: "I2",
                    label: "I2中国文学",
                    },
                ],
                },
                {
                value: "J",
                label: "J艺术",
                children: [
                    {
                    value: "J",
                    label: "全部",
                    },
                    {
                    value: "J2",
                    label: "J2绘画",
                    },
                    {
                    value: "J9",
                    label: "J9电影、电视艺术",
                    },
                ],
                },
                {
                value: "K",
                label: "K历史、地理",
                children: [
                    {
                    value: "K",
                    label: "全部",
                    },
                    {
                    value: "K1",
                    label: "K1世界史",
                    },
                    {
                    value: "K2",
                    label: "K2中国史",
                    },
                    {
                    value: "K9",
                    label: "K9地理",
                    },
                ],
                },
                {
                value: "N",
                label: "N自然科学总论",
                children: [
                    {
                    value: "N",
                    label: "全部",
                    },
                    {
                    value: "N0",
                    label: "N0自然科学理论与方法论",
                    },
                ],
                },
                {
                value: "O",
                label: "O数理科学和化学",
                children: [
                    {
                    value: "O",
                    label: "全部",
                    },
                    {
                    value: "O1",
                    label: "O1数学",
                    },
                    {
                    value: "O4",
                    label: "O4物理学",
                    },
                    {
                    value: "O6",
                    label: "O6化学",
                    },
                ],
                },
                {
                value: "P",
                label: "P天文学、地球科学",
                children: [
                    {
                    value: "P",
                    label: "全部",
                    },
                    {
                    value: "P1",
                    label: "P1天文学",
                    },
                    {
                    value: "P9",
                    label: "P9自然地理学",
                    },
                ],
                },
                {
                value: "Q",
                label: "Q生物科学",
                children: [
                    {
                    value: "Q",
                    label: "全部",
                    },
                    {
                    value: "Q2",
                    label: "Q2细胞生物学",
                    },
                    {
                    value: "Q4",
                    label: "Q4遗传学",
                    },
                    {
                    value: "Q94",
                    label: "Q94植物学",
                    },
                ],
                },
                {
                value: "R",
                label: "R医药、卫生",
                children: [
                    {
                    value: "R",
                    label: "全部",
                    },
                    {
                    value: "R3",
                    label: "R3基础医学",
                    },
                    {
                    value: "R4",
                    label: "R4临床医学",
                    },
                    {
                    value: "R9",
                    label: "R9药学",
                    },
                ],
                },
                {
                value: "S",
                label: "S农业科学",
                children: [
                    {
                    value: "S",
                    label: "全部",
                    },
                    {
                    value: "S1",
                    label: "S1农业基础科学",
                    },
                    {
                    value: "S6",
                    label: "S6园艺",
                    },
                ],
                },
                {
                value: "T",
                label: "T工业技术",
                children: [
                    {
                    value: "T",
                    label: "全部",
                    },
                    {
                    value: "TB",
                    label: "TB一般工业技术",
                    },
                    {
                    value: "TN",
                    label: "TN无线电电子学、电信技术",
                    },
                    {
                    value: "TP",
                    label: "TP自动化技术、计算机技术",
                    },
                ],
                },
                {
                value: "U",
                label: "U交通运输",
                children: [
                    {
                    value: "U",
                    label: "全部",
                    },
                    {
                    value: "U2",
                    label: "U2铁路运输",
                    },
                    {
                    value: "U4",
                    label: "U4公路运输",
                    },
                    {
                    value: "U6",
                    label: "U6水路运输",
                    },
                ],
                },
                {
                value: "V",
                label: "V航空、航天",
                children: [
                    {
                    value: "V",
                    label: "全部",
                    },
                    {
                    value: "V2",
                    label: "V2航空",
                    },
                    {
                    value: "V4",
                    label: "V4航天",
                    },
                ],
                },
                {
                value: "X",
                label: "X环境科学、安全科学",
                children: [
                    {
                    value: "X",
                    label: "全部",
                    },
                    {
                    value: "X1",
                    label: "X1环境科学基础理论",
                    },
                    {
                    value: "X3",
                    label: "X3环境保护管理",
                    },
                ],
                },
                {
                value: "Z",
                label: "Z综合类图书",
                children: [
                    {
                    value: "Z",
                    label: "全部",
                    },
                ],
                },
            ],      
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
                console.log(result);
              })
              .catch(error => {console.log('error', error);that.loading = false});
          }
        };
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