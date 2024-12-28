import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @MessagePattern({ cmd: 'create_project' })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'find_all_projects' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.projectsService.findAll(paginationDto);
  }



  @MessagePattern({ cmd: 'find_one_project' })
  findOne(@Payload() id: string) {
    return this.projectsService.findOne(id);
  }


  @MessagePattern({ cmd: 'find_by_owner_email' })
  findByOwnerEmail(@Payload() ownerId: string) {
    return this.projectsService.findByOwnerEmail(ownerId);
  }

  @MessagePattern({ cmd: 'update_project' })
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(updateProjectDto.id, updateProjectDto);
  }

  @MessagePattern({ cmd: 'remove_project' })
  remove(@Payload() id: string) {
    return this.projectsService.remove(id);
  }
}
