import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { NATS_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProjectsService extends PrismaClient implements OnModuleInit {

  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,

  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log("base de datos coenctada")
  }




  async create(createProjectDto: CreateProjectDto) {

    // const {ownerId} = createProjectDto

    const newProject = await this.project.create({

      data: createProjectDto,
    })

    return newProject

  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto

    const totalPages = await this.project.count()

    const lastPages = Math.ceil(totalPages / limit)


    return {
      data: await this.project.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      metadata: {
        totalPages: totalPages,
        page: page,
        lastPages: lastPages
      }


    }
  }



  async findOne(id: string) {

    console.log(id)

    try {

      const project = await this.project.findUnique({
        where: {
          id: id
        }
      });

      return project
    } catch (error) {
      throw new RpcException({ message: 'No se ha encontrado el proyecto', status: HttpStatus.BAD_REQUEST });
    }

  }

  async findByOwnerEmail(ownerId: string) {
    console.log('Searching for projects with ownerId:', ownerId, typeof ownerId);


    try {
      const projects = await this.project.findMany({
        where: {
          ownerId: ownerId
        }
      });

      console.log('Found projects:', projects);

      if (projects.length === 0) {
        return []
      }

      return projects;

    } catch (error) {
      console.error('Error while fetching projects:', error);
      throw new RpcException({ message: 'Algo ha fallado, comunicate con tu administrador', status: HttpStatus.BAD_REQUEST });
    }
  }



  update(id: string, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: string) {
    return `This action removes a #${id} project`;
  }
}
