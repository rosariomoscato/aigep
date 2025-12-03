// Dashboard functionality test
import { getDataScientistDashboard, getComplianceOfficerDashboard, getAuditorDashboard, getProductManagerDashboard } from './mock-data/dashboard-metrics';

export function testDashboardData() {
  console.log('🚀 Testing Dashboard Data Generation...');

  try {
    // Test Data Scientist Dashboard
    const dsDashboard = getDataScientistDashboard();
    console.log('✅ Data Scientist Dashboard:', {
      projectHealth: dsDashboard.projectHealth.length,
      experiments: dsDashboard.experiments.length,
      projects: dsDashboard.projects.length,
      teamPerformance: dsDashboard.teamPerformance.length
    });

    // Test Compliance Officer Dashboard
    const coDashboard = getComplianceOfficerDashboard();
    console.log('✅ Compliance Officer Dashboard:', {
      complianceRisks: coDashboard.complianceRisks.length,
      complianceQueue: coDashboard.complianceQueue.length,
      auditFindings: coDashboard.auditFindings.length,
      projects: coDashboard.projects.length
    });

    // Test Auditor Dashboard
    const auditorDashboard = getAuditorDashboard();
    console.log('✅ Auditor Dashboard:', {
      auditSchedules: auditorDashboard.auditSchedules.length,
      auditFindings: auditorDashboard.auditFindings.length,
      projects: auditorDashboard.projects.length
    });

    // Test Product Manager Dashboard
    const pmDashboard = getProductManagerDashboard();
    console.log('✅ Product Manager Dashboard:', {
      projectPortfolio: pmDashboard.projectPortfolio.length,
      teamPerformance: pmDashboard.teamPerformance.length,
      businessMetrics: pmDashboard.businessMetrics
    });

    console.log('🎉 All dashboard data tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Dashboard data test failed:', error);
    return false;
  }
}

export function validateDashboardStructure() {
  console.log('🔍 Validating Dashboard Structure...');

  const validationResults = {
    dataScientist: false,
    complianceOfficer: false,
    auditor: false,
    productManager: false
  };

  try {
    const dsDashboard = getDataScientistDashboard();
    validationResults.dataScientist = dsDashboard.projectHealth.length > 0 &&
                                    dsDashboard.experiments.length >= 0 &&
                                    dsDashboard.projects.length >= 0;

    const coDashboard = getComplianceOfficerDashboard();
    validationResults.complianceOfficer = coDashboard.complianceRisks.length >= 0 &&
                                      coDashboard.complianceQueue.length >= 0 &&
                                      coDashboard.auditFindings.length >= 0;

    const auditorDashboard = getAuditorDashboard();
    validationResults.auditor = auditorDashboard.auditSchedules.length >= 0 &&
                               auditorDashboard.auditFindings.length >= 0;

    const pmDashboard = getProductManagerDashboard();
    validationResults.productManager = pmDashboard.projectPortfolio.length >= 0 &&
                                   pmDashboard.teamPerformance.length >= 0;

    const allValid = Object.values(validationResults).every(result => result);

    if (allValid) {
      console.log('✅ All dashboard structures validated successfully!');
    } else {
      console.log('⚠️ Some dashboard structures failed validation:', validationResults);
    }

    return allValid;
  } catch (error) {
    console.error('❌ Dashboard structure validation failed:', error);
    return false;
  }
}