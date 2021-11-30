import nodemailer from 'nodemailer';

import Users from '@models/users';

let instance: any = null;
class EmailService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async isUniqueEmail(email: string) {
    const user = await Users.findOne({ userEmail: email });
    return !user;
  }

  async sendVerificationMail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'hyunee169@gmail.com',
        pass: process.env.GMAIL_PASS,
      },
    });

    const VerificationNumber = String(
      Math.floor(Math.random() * 999999),
    ).padStart(6, '0');

    await transporter.sendMail({
      from: 'hyunee169@gmail.com',
      to: email,
      subject: '노가리하우스 인증번호입니다',
      html: `
      <h1>인증번호<h1>
      <h3>아래의 인증번호를 회원가입 화면에 입력해주세요</h3>
      <h2>${VerificationNumber}</h2>
      `,
    });

    return VerificationNumber;
  }

  async sendInviteMail(userDocumentId: string, email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      host: 'smtp.gmail.com',
      secure: false,
      requireTLS: true,
      auth: {
        user: 'hyunee169@gmail.com',
        pass: process.env.GMAIL_PASS,
      },
    });

    const user = await Users.findById(userDocumentId);
    const inviteLink = 'https://nogarihouse.nemne.dev/signup';

    await transporter.sendMail({
      from: 'hyunee169@gmail.com',
      to: email,
      subject: '노가리하우스로 초대합니다.',
      html: `
      <h1>${user!.userName}님이 노가리 하우스로 초대하셨습니다.</h1>

      <div><a href=${inviteLink}>🐟 Nogari House 바로가기 🐟</a></div>

      <div>언제 어디서나 편하게 노가리를 깔 수 있는곳! 노가리 하우스🏖로 놀러오세요</div>
      <div>다양한 주제로 다양한 사람들과 노라기를 깔 수 있습니다! 🎤</div>
      <div>아직 나의 목소리를 공개하기 수줍다고요? 그럼 익명 음성 채팅 기능을 활용해보세요! 😎</div>
      <div>클럽하우*는 모바일만 지원이 됐죠? 노가리 하우스는 웹에서도 지원이 됩니다! 🛠️</div>
      <div>만약 이번에 만난 사람들과 더 노가릴 까고 싶다면? 팔로우 하세요! 🙌</div>`,
    });
  }
}

export default new EmailService();
