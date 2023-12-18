#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#  SPDX-License-Identifier: Apache-2.0

import io
from unittest import TestCase, mock
import importlib
from moto import mock_sts, mock_secretsmanager
import boto3

from automation_packages.ads.test_ads_common import mock_file_open
from automation_packages.ads.test_ads_common import default_mock_os_environ
from cmf_logger import logger

CMF_LINUX_SERVER = {
    "server_id": "1",
    "server_name": "server1",
    "app_id": "1",
    "r_type": "Rehost",
    "server_os_family": "linux",
    "server_fqdn": "server1.onpremsim.env"
}

CMF_WINDOWS_SERVER = {
    "server_id": "2",
    "server_name": "server2",
    "app_id": "2",
    "r_type": "Rehost",
    "server_os_family": "windows",
    "server_fqdn": "server2.onpremsim.env"
}

DEFAULT_ARGS = [
    "--Waveid=1",
    "--NoPrompts=True",
    "--UseSSL=True",
    "--ADSHomeRegion=us-east-1",
    "--SecretADSAgents=ADSAgentSecret"
]

DEFAULT_OUTPUT = 'data\ndata\n'

DEFAULT_RETURN_MESSAGE = "message 1"


def mock_return_valid_factory_login():
    return "1234567890abcdefgh"


def mock_return_valid_empty_factory_servers(waveid, token, os_split=True, rtype=None):
    return [], True, True


def mock_return_valid_populated_factory_servers(waveid, token, os_split=True, rtype=None):
    valid_factory_servers = [
        {
            "aws_accountid": "111111111111",
            "aws_region": "us-east-1",
            "servers_windows": [],
            "servers_linux": [
                CMF_LINUX_SERVER
            ]
        },
        {
            "aws_accountid": "222222222222",
            "aws_region": "us-east-1",
            "servers_windows": [
                CMF_WINDOWS_SERVER
            ],
            "servers_linux": []
        }
    ]
    return valid_factory_servers, True, True


def mock_execute_cmd_via_ssh(host, username, key, cmd, using_key):
    output = ""
    error = ""
    return output, error


@mock_secretsmanager
def set_up_secret_manager():
    secretsmanager_client = boto3.client(
        'secretsmanager', 'us-east-1')
    response1 = secretsmanager_client.create_secret(
        Name='ADSAgentSecret',
        Description="ADS-AgentSecret",
        SecretString="{\"SECRET_KEY\": \"123456789\", \"SECRET_VALUE\": \"123456789\"}"
    )

    print(response1)

    response2 = secretsmanager_client.create_secret(
        Name='ADSOSSecretDomain',
        Description="ADS-OSSecretDomain",
        SecretString="{\"USERNAME\": \"testuser@example.com\", \"PASSWORD\": \"123456789\"}"
    )
    print(response2)

    response3 = secretsmanager_client.create_secret(
        Name='ADSOSSecretLocal',
        Description="ADS-OSSecretLocal",
        SecretString="{\"USERNAME\": \"user2\", \"PASSWORD\": \"123456789\"}"
    )

    print(response3)

@mock.patch.dict('os.environ', default_mock_os_environ)
@mock_secretsmanager
@mock_sts
@mock.patch('builtins.open', new=mock_file_open)
class ADSAgentInstall(TestCase):

    @mock.patch('builtins.open', new=mock_file_open)
    def test_parse_boolean(self):
        logger.info("Testing parse_boolean: "
                    "function used to parse strings to bool")
        agent_install = importlib.import_module('0-ADS-AgentInstall')

        response = agent_install.parse_boolean('YES')

        self.assertEqual(response, True)

        response = agent_install.parse_boolean('NO')

        self.assertEqual(response, False)

    @mock.patch("mfcommon.factory_login",
                new=mock_return_valid_factory_login)
    @mock.patch("mfcommon.get_factory_servers",
                new=mock_return_valid_empty_factory_servers)
    @mock.patch.dict('os.environ', default_mock_os_environ)
    @mock.patch('builtins.open', new=mock_file_open)
    @mock_secretsmanager
    def test_agent_install_empty_server_list(self):
        logger.info("Testing Agent Install main: "
                    "Empty server list provided")

        set_up_secret_manager()

        agent_install = importlib.import_module('0-ADS-AgentInstall')

        response = agent_install.main(DEFAULT_ARGS)

        self.assertEqual(response, 0)

    @mock.patch("mfcommon.factory_login",
                new=mock_return_valid_factory_login)
    @mock.patch("mfcommon.get_factory_servers",
                new=mock_return_valid_populated_factory_servers)
    @mock_sts
    @mock.patch("subprocess.Popen")
    @mock.patch("subprocess.run")
    @mock.patch('builtins.open', new=mock_file_open)
    @mock_secretsmanager
    def test_agent_install_with_server_list_domain(self, mock_popen, mock_run):
        logger.info("Testing Agent Install main: "
                    "With server list provided")

        set_up_secret_manager()

        agent_install = importlib.import_module('0-ADS-AgentInstall')

        mocked_popen = mock_popen.return_value
        mocked_popen.stdout = io.StringIO(DEFAULT_OUTPUT)
        mocked_popen.stderr = io.StringIO('')
        mocked_popen.wait.return_value = 0

        args = DEFAULT_ARGS + ["--SecretWindows=ADSOSSecretDomain"]

        print(args)

        response = agent_install.main(args)

        self.assertEqual(response, 0)

    @mock.patch("mfcommon.factory_login",
                new=mock_return_valid_factory_login)
    @mock.patch("mfcommon.get_factory_servers",
                new=mock_return_valid_populated_factory_servers)
    @mock_sts
    @mock.patch("subprocess.Popen")
    @mock.patch("subprocess.run")
    @mock.patch('builtins.open', new=mock_file_open)
    @mock_secretsmanager
    def test_agent_install_with_server_list_local(self, mock_popen, mock_run):
        logger.info("Testing Agent Install main: "
                    "With server list provided and local windows user")

        set_up_secret_manager()

        agent_install = importlib.import_module('0-ADS-AgentInstall')

        mocked_popen = mock_popen.return_value
        mocked_popen.stdout = io.StringIO(DEFAULT_OUTPUT)
        mocked_popen.stderr = io.StringIO('')
        mocked_popen.wait.return_value = 0

        args = DEFAULT_ARGS + ["--SecretWindows=ADSOSSecretLocal"]

        print(args)

        response = agent_install.main(args)

        self.assertEqual(response, 0)
