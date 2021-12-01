import { IToast } from '@atoms/toast-list';

const inviteWarningType = {
  exist: '이미 존재하는 이메일입니다',
  validation: '올바른 형식의 이메일을 입력해주세요',
};

const signupWaringType = {
  emailExist: {
    title: '로그인 에러',
    description: '이미 존재하는 이메일입니다',
  },
  emailValidation: {
    title: '로그인 에러',
    description: '올바른 이메일을 입력해주세요',
  },
  verification: {
    title: '로그인 에러',
    description: '인증번호를 확인하세요.',
  },
};
const signupInfoWaringType = {
  passLength: {
    title: '비밀번호 에러',
    description: '비밀번호는 6자 이상 16자 이하입니다.',
  },
  passMatching: {
    title: '비밀번호 일치 에러',
    description: '비밀번호가 일치하지 않습니다.',
  },
  idExist: {
    title: '아이디 중복 에러',
    description: '이미 존재하는 아이디입니다.',
  },
};

export default {
  addEventSuccess: (description: string): IToast => ({
    type: 'success',
    title: '등록 성공',
    description,
  }),
  inviteSuccess: (): IToast => ({
    type: 'success',
    title: '전송 완료',
    description: '초대장이 발송되었습니다',
  }),
  inviteWarning: (type: 'exist' | 'validation'): IToast => ({
    type: 'warning',
    title: '초대장 에러',
    description: inviteWarningType[type],
  }),
  handsInfo: (userName: string): IToast => ({
    type: 'info',
    title: '반가운 인사',
    description: `${userName}님이 손을 흔들었습니다!`,
  }),
  profileChangeSuccess: (): IToast => ({
    type: 'success',
    title: '프로필 설정',
    description: '지정한 이미지로 변경이 완료됐습니다',
  }),
  roomInviteSuccess: (): IToast => ({
    type: 'success',
    title: '방 초대',
    description: '초대 메세지를 보냈습니다!',
  }),
  roomInviteDanger: (): IToast => ({
    type: 'danger',
    title: '방 초대',
    description: '초대 메세지 전송 실패했습니다!',
  }),
  roomLimitOverDanger: (): IToast => ({
    type: 'danger',
    title: '방 접속 실패',
    description: '입장 가능 인원수가 초과되어 입장이 불가능 합니다',
  }),
  roomEnterSuccess: (): IToast => ({
    type: 'success',
    title: '방 접속',
    description: '성공적으로 방에 접속했습니다!',
  }),
  roomCreateDanger: (): IToast => ({
    type: 'danger',
    title: '방 생성',
    description: '방 생성을 실패했습니다',
  }),
  roomAllowMicDanger: (): IToast => ({
    type: 'danger',
    title: '장치 허용',
    description: '마이크를 허용하지 않을 경우 방에 참가할 수 없습니다.',
  }),
  roomMatchingDanger: (): IToast => ({
    type: 'danger',
    title: '방 매칭 실패',
    description: '현재 접속 가능한 익명 허용 방이 없습니다',
  }),
  signInWarning: (): IToast => ({
    type: 'warning',
    title: '로그인 에러',
    description: '로그인 정보를 확인하세요',
  }),
  signupInfoWarning: (type: 'passLength' | 'passMatching' | 'idExist'): IToast => ({
    type: 'warning',
    ...signupInfoWaringType[type],
  }),
  signupWarning: (type: 'emailExist' | 'emailValidation' | 'verification'): IToast => ({
    type: 'warning',
    ...signupWaringType[type],
  }),
};
// import toastMessage from '@constants/toast-message';
