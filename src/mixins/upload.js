import { fetchToken } from "@/api/upload";
import { v4 as uuidv4 } from "uuid";

const upload = {
  data() {
    return {
      uploadData: {
        token: "",
        key: "",
      },
      imageUrl: "",
    };
  },
  methods: {
    async beforeImageUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传头像图片只能是 JPG,PNG,GIF 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }

      const res = await fetchToken();
      this.uploadData.token = res.data.uploadToken;

      const ext = file.type.split("/")[1];
      this.uploadData.key = `${uuidv4()}.${ext}`;
    },
  },
};
export default upload;
