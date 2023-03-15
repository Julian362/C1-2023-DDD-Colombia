import { ChangedDescriptionEventPublisher } from '@context/product/domain/events';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangedDescriptionCategoryPublisher extends ChangedDescriptionEventPublisher {}
