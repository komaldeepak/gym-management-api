import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(
    private readonly analyticsService: AnalyticsService,
  ) {}

  // Dashboard Analytics
  @Get('dashboard')
  getDashboard() {
    return this.analyticsService.getDashboard();
  }

  // Membership Report
  @Get('membership-report')
  getMembershipReport() {
    return this.analyticsService.getMembershipReport();
  }

  // Average Age Report
  @Get('average-age')
  getAverageAge() {
    return this.analyticsService.getAverageAge();
  }

  // Members aged 18 and above ($match)
  @Get('adult-members')
  getAdultMembers() {
    return this.analyticsService.getAdultMembers();
  }

  // Gym + User Details ($lookup)
  @Get('gym-users')
  getGymUsers() {
    return this.analyticsService.getGymUsers();
  }
}