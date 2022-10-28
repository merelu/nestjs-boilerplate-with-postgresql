import { AuthJwt } from '@infrastructure/common/decorators/auth.decorator';
import { BaseMetaResponseFormat } from '@infrastructure/common/interceptors/response.interceptor';
import { ApiResponseType } from '@infrastructure/common/swagger/response.decorator';
import { UseCasesProxyModule } from '@infrastructure/usercases-proxy/usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usercases-proxy/usercases-proxy';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AddContactUseCases } from 'src/usecases/contact/addContact.usecases';
import { GetContactUseCases } from 'src/usecases/contact/getContact.usecases';
import { GetContactsUseCases } from 'src/usecases/contact/getContacts.usecases';
import { AddContactDto } from './contact.dto';
import { ContactPresenter } from './contact.presenter';

@Controller('contact')
@ApiTags('Contact')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ContactPresenter)
export class ContactController {
  constructor(
    @Inject(UseCasesProxyModule.ADD_CONTACT_USECASES_PROXY)
    private readonly addContactUseCaseProxy: UseCaseProxy<AddContactUseCases>,
    @Inject(UseCasesProxyModule.GET_CONTACT_USECASES_PROXY)
    private readonly getContactUseCaseProxy: UseCaseProxy<GetContactUseCases>,
    @Inject(UseCasesProxyModule.GET_CONTACTS_USECASES_PROXY)
    private readonly getContactsUseCaseProxy: UseCaseProxy<GetContactsUseCases>,
  ) {}

  @Post()
  @ApiOperation({ description: 'Contact 추가' })
  @ApiResponseType(ContactPresenter, BaseMetaResponseFormat)
  async addContact(@Body() body: AddContactDto) {
    const contactCreated = await this.addContactUseCaseProxy
      .getInstance()
      .execute(body);

    return { data: new ContactPresenter(contactCreated), meta: null };
  }

  @Get(':contact_id')
  @AuthJwt()
  @ApiOperation({ description: 'Contact 정보 호출 (by id)' })
  @ApiResponseType(ContactPresenter, BaseMetaResponseFormat)
  async getContactById(@Param('contact_id') id: string) {
    const result = await this.getContactUseCaseProxy.getInstance().execute(id);

    return { data: new ContactPresenter(result), meta: null };
  }

  @Get('all')
  @AuthJwt()
  @ApiOperation({ description: 'Contact 전부 호출' })
  @ApiResponseType(ContactPresenter, BaseMetaResponseFormat, true)
  async getContacts() {
    const result = await this.getContactsUseCaseProxy.getInstance().execute();

    return {
      data: result.map((contact) => new ContactPresenter(contact)),
      meta: null,
    };
  }
}
