<template>
  <div>
    <div class="login-box">
      <!--로그인영역-->
      <div class="login-box-outer">
        <div class="login-box-inner">
          <div class="login-logo">
            <h1>LOGIN</h1>
          </div>
          <!--로그인선택-->
          <div class="login-select mt-2">
            <form role="form" class="login-idpw">
              <el-input
                v-model="loginForm.userId"
                class="login-id"
                placeholder="아이디"
                alternative
                @keyup.enter="onSubmit"
              />
              <el-input
                v-model="loginForm.userPw"
                type="password"
                class="login-pw"
                placeholder="비밀번호"
                alternative
                @keyup.enter="onSubmit"
              />
            </form>
            <a class="btn btn-neutral" @click="onSubmit">
              <span class="btn-inner--text">로그인</span>
            </a>
            <ul class="btn-idpw-area">
              <li>
                <el-button class="btn-pw" @click="modalFg.issueTempPw=true">
                  회원가입
                </el-button>
              </li>
              <li>
                <el-button class="btn-id" @click="modalFg.findId=true">
                  아이디 찾기
                </el-button>
              </li>
              <li>
                <el-button class="btn-pw" @click="modalFg.issueTempPw=true">
                  비밀번호 변경
                </el-button>
              </li>
            </ul>
          </div>
          <!--//로그인선택-->
        </div>
      </div>
      <!--//로그인영역-->
    </div>

    <!--아이디 찾기 팝업-->
    <!-- <findId
      v-model="modalFg.findId"
      :close="closeModal"
    /> -->

    <!--임시 비밀번호 전송 팝업-->
    <!-- <issueTempPw
      v-model="modalFg.issueTempPw"
      :close="closeModal"
    /> -->
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

const loginForm = ref({ userId: '0503', userPw: '1234' })

const modalFg = {
  findId: false,
  issueTempPw: false
}

function onSubmit () {
  // const { data, pending, error, refresh } = useApi('/api/v1/auth/login', {
  useApi.post('login', '/api/v1/auth/login', {
    userId: loginForm.value.userId,
    userPw: loginForm.value.userPw
  }).then((res: any) => {
    const data = res.data._value

    if (!data.success) {
      ElMessage.error(data.message)
    } else {
      const userData = (typeof data.userData === 'undefined' || comfn.isEmpty(data.userData)) ? '' : data.userData

      comfn.setCookie('user_name', userData.userName, null)
      comfn.setCookie('user_id', userData.userId, null)
      comfn.setCookie('access_token', userData.accessTk, {
        maxAge: 60 * 30 // 30분
      })
      comfn.setCookie('refresh_token', userData.refreshTk, {
        maxAge: 60 * 60 * 3 // 3시간
      })

      router.push({
        name: 'Dashboard',
        params: {
          chgPwFg: data.chgPwFg
        }
      })
    }
  })
}
</script>
<style>
</style>
